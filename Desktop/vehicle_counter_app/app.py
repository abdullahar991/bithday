from flask import Flask, render_template, request, redirect, url_for, send_from_directory, jsonify
from ultralytics import YOLO
import cv2
import os
import threading

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads'
OUTPUT_VIDEO = 'static/processed/output.mp4'

# Ensure directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT_VIDEO), exist_ok=True)

# Global vehicle counts
vehicle_counts = {
    'car': {'in': 0, 'out': 0},
    'motorcycle': {'in': 0, 'out': 0},
    'bus': {'in': 0, 'out': 0},
    'truck': {'in': 0, 'out': 0}
}

# Model setup
model = YOLO('yolov8n.pt')
class_names = {2: 'car', 3: 'motorcycle', 5: 'bus', 7: 'truck'}

# Flag for processing status
processing_done = threading.Event()

def process_video(path):
    global vehicle_counts
    processing_done.clear()
    vehicle_counts = {k: {'in': 0, 'out': 0} for k in vehicle_counts}

    cap = cv2.VideoCapture(path)
    resize_dim = (1280, 720)
    counting_line = [(50, 500), (1230, 500)]
    tracked_vehicles = {}
    frame_skip = 2
    frame_count = 0
    fps = cap.get(cv2.CAP_PROP_FPS)
    fps = fps if fps and fps > 0 else 30
    fps = fps // frame_skip or 1

    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(OUTPUT_VIDEO, fourcc, fps, resize_dim)

    if not out.isOpened():
        print("ERROR: Failed to open VideoWriter.")
        processing_done.set()
        return

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        frame_count += 1
        if frame_count % frame_skip != 0:
            continue

        frame = cv2.resize(frame, resize_dim)
        results = model.track(frame, persist=True, classes=[2, 3, 5, 7])
        detections = results[0]

        if detections.boxes.id is None:
            continue

        boxes = detections.boxes.xyxy.cpu().numpy()
        track_ids = detections.boxes.id.cpu().numpy()
        class_ids = detections.boxes.cls.cpu().numpy().astype(int)

        for box, track_id, class_id in zip(boxes, track_ids, class_ids):
            x1, y1, x2, y2 = map(int, box)
            center = ((x1 + x2) // 2, (y1 + y2) // 2)
            class_name = class_names.get(class_id, None)
            if class_name is None:
                continue

            if track_id not in tracked_vehicles:
                tracked_vehicles[track_id] = {'class': class_name, 'positions': []}
            tracked_vehicles[track_id]['positions'].append(center)

            if len(tracked_vehicles[track_id]['positions']) > 1:
                prev_pos = tracked_vehicles[track_id]['positions'][-2]
                if prev_pos[1] < counting_line[0][1] and center[1] >= counting_line[0][1]:
                    vehicle_counts[class_name]['in'] += 1
                elif prev_pos[1] > counting_line[0][1] and center[1] <= counting_line[0][1]:
                    vehicle_counts[class_name]['out'] += 1

        # Draw counting line and stats
        cv2.line(frame, counting_line[0], counting_line[1], (0, 255, 0), 2)
        y_offset = 30
        for vehicle_type, counts in vehicle_counts.items():
            cv2.putText(frame, f'{vehicle_type.title()} In: {counts["in"]} Out: {counts["out"]}',
                        (30, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)
            y_offset += 30

        out.write(frame)

    cap.release()
    out.release()
    print("Finished writing output.mp4")
    processing_done.set()

@app.route('/')
def index():
    return render_template('index.html', counts=vehicle_counts)

@app.route('/upload', methods=['POST'])
def upload():
    if 'video' not in request.files or request.files['video'].filename == '':
        return redirect(url_for('index'))

    video = request.files['video']
    filepath = os.path.join(UPLOAD_FOLDER, video.filename)
    video.save(filepath)

    threading.Thread(target=process_video, args=(filepath,)).start()
    return redirect(url_for('index'))

@app.route('/counts')
def counts():
    return jsonify(vehicle_counts)

@app.route('/video')
def video():
    if not processing_done.is_set() or not os.path.exists(OUTPUT_VIDEO):
        return '', 404
    return send_from_directory(directory='static/processed', path='output.mp4')

if __name__ == '__main__':
    app.run(debug=True)
