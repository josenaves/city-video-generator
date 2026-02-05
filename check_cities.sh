#!/bin/bash

echo "=== CIDADES QUE PRECISAMOS (10 mais pobres do RS) ==="
echo "1. Tunas"
echo "2. Monte Alegre dos Campos"
echo "3. Chuvisca"
echo "4. Barão do Triunfo"
echo "5. Amaral Ferrador"
echo "6. Mampituba"
echo "7. Passa Sete"
echo "8. Lagoão"
echo "9. Redentora"
echo "10. Dom Feliciano"
echo ""

echo "=== IMAGENS DISPONÍVEIS NO RS ==="
find public/images/cities/rs -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.avif" \) -exec basename {} \; | sed 's/\.[^.]*$//' | sort

echo ""
echo "=== CIDADES QUE NÃO TEM IMAGEM ==="
for cidade in "tunas" "monte-alegre-dos-campos" "chuvisca" "barao-do-triunfo" "amaral-ferrador" "mampituba" "passa-sete" "lagoon" "redentora" "dom-feliciano"; do
    if ! find public/images/cities/rs -name "*${cidade}*" >/dev/null 2>&1; then
        echo "• ${cidade//-/$' '}" | sed 's/\b\(.\)/\u\1/g'
    fi
done
