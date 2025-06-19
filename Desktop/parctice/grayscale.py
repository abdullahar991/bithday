import cv2
import numpy as np
org_image = cv2.imread("cat.jpeg")
width,height,_ = org_image.shape
cv2.imshow("original Image",org_image)

gray_image = cv2.cvtColor(org_image,cv2.COLOR_BGR2GRAY)
cv2.imshow("Grayscale Image",gray_image)

# Resize_image = cv2.resize(org_image,(width*3,height*3),interpolation=cv2.INTER_LANCZOS4)
# cv2.imshow("Resize Image",Resize_image)

# resize_gray_image = cv2.cvtColor(Resize_image,cv2.COLOR_BGR2GRAY)
# cv2.imshow("Resize Grayscale Image",resize_gray_image)

# blur_image = cv2.GaussianBlur(org_image,(5,5),0)
# cv2.imshow("Blur Image",blur_image)

# blur_gray_image = cv2.GaussianBlur(gray_image,(5,5),0)
# cv2.imshow("Blur Gray Image",blur_gray_image)

# blur_Resize_image = cv2.GaussianBlur(Resize_image,(5,5),0)
# cv2.imshow("Blur Resize Image",blur_Resize_image)

# blur_Resize_gray_image = cv2.GaussianBlur(resize_gray_image,(5,5),0)
# cv2.imshow("Blur Resize Gray Image",blur_Resize_gray_image)

# sobel_x = cv2.Sobel(gray_image,cv2.CV_64F,1,0,ksize=3)
# sobel_y = cv2.Sobel(gray_image,cv2.CV_64F,0,1,ksize=3)
# magnitude = np.sqrt(sobel_x**2 + sobel_y**2)
# magnitude = np.uint8(255*magnitude/np.max(magnitude))

# cv2.imshow("Sobel detection image",magnitude)

# canny_image = cv2.Canny(blur_gray_image,threshold1=50,threshold2=100)
# cv2.imshow("Canny image",magnitude)

# gray = np.float32(gray_image)

# corners = cv2.cornerHarris(gray,blockSize=2,ksize=3,k=0.04)
# org_image[corners > 0.01 * corners.max()] = [0, 0, 255] 

# cv2.imshow("Corner Harris", org_image)

sift = cv2.SIFT_create()
keypoints,detectors = sift.detectAndCompute(gray_image, None)
image_with_keypoints = cv2.drawKeypoints(org_image, keypoints, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
cv2.imshow("SIFT", image_with_keypoints)
cv2.waitKey(0)
cv2.destroyAllWindows()