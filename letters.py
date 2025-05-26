import cv2
import mediapipe as mp
import numpy as np

# Inicializar MediaPipe Hands
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=1, min_detection_confidence=0.8)
mp_draw = mp.solutions.drawing_utils

# Inicializar la cámara
cap = cv2.VideoCapture(0)

def detectar_letra(landmarks):
    dedos_arriba = []

    tips = [8, 12, 16, 20]
    for tip in tips:
        if landmarks[tip].y < landmarks[tip - 2].y:
            dedos_arriba.append(1)
        else:
            dedos_arriba.append(0)

    pulgar = 1 if landmarks[4].x < landmarks[3].x else 0

    if dedos_arriba == [0, 0, 0, 0] and pulgar == 0:
        return "A"
    elif dedos_arriba == [1, 1, 1, 1] and pulgar == 0:
        return "B"
    elif dedos_arriba == [1, 1, 1, 1] and pulgar == 1:
        return "L"
    elif dedos_arriba == [1, 1, 0, 0] and pulgar == 0:
        return "C"
    else:
        return ""

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
            landmark_list = hand_landmarks.landmark
            letra = detectar_letra(landmark_list)

            if letra:
                cv2.putText(frame, f"Letra: {letra}", (10, 70),
                            cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 0, 0), 3)

    cv2.imshow("LSP Traductor (demo)", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
