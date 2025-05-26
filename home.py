import cv2
import mediapipe as mp
import math

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, max_num_hands=2, min_detection_confidence=0.7)
mp_draw = mp.solutions.drawing_utils

cap = cv2.VideoCapture(0)

def distancia(p1, p2):
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)

def detectar_casa(manos):
    if len(manos) != 2:
        return False

    mano1, mano2 = manos

    indice1 = mano1.landmark[8]
    indice2 = mano2.landmark[8]

    medio1 = mano1.landmark[12]
    medio2 = mano2.landmark[12]

    cerca = distancia(indice1, indice2) < 0.1
    arriba1 = indice1.y < medio1.y
    arriba2 = indice2.y < medio2.y

    return cerca and arriba1 and arriba2

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)

    mensaje = ""

    if results.multi_hand_landmarks and len(results.multi_hand_landmarks) == 2:
        manos = results.multi_hand_landmarks
        if detectar_casa(manos):
            mensaje = "Palabra: CASA"
        for hand_landmarks in manos:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    elif results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_draw.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)

    if mensaje:
        cv2.putText(frame, mensaje, (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 0), 3)

    cv2.imshow("Traductor LSP - CASA", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break



cap.release()
cv2.destroyAllWindows()