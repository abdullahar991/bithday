import cv2 as cv
import PIL.Image as Image
import numpy as np

def get_limits(color):
    c = np.uint8([[color]])
    
    hsv_color = cv.cvtColor(c,cv.COLOR_BGR2HSV)
    
    lower_limit = np.array([hsv_color[0][0][0] - 10,100,100])
    upper_limit = np.array([hsv_color[0][0][0] + 10,255,255])
    
    return lower_limit,upper_limit

cap = cv.VideoCapture(0)
Yellow = [0,255,255]
while True:
    ret, frame = cap.read()
    if ret:
        hsv_frame = cv.cvtColor(frame,cv.COLOR_BGR2HSV)
        lower_limit,Upper_limit = get_limits(Yellow)
        
        mask = cv.inRange(hsv_frame,lower_limit,Upper_limit)
        mask_ = Image.fromarray(mask)
        
        bbox = mask_.getbbox()
        if bbox:
            x1,y1,w,h = bbox
            
            cv.rectangle(frame,(x1,y1),(x1+w,y1+h),(0,255,0),3)
        cv.imshow("frame",frame)
        
        if cv.waitKey(1) == ord('q'):
            break
        
        
cap.release()
cv.destroyAllWindows()