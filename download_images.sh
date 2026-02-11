#!/bin/bash
mkdir -p public/images/cities/pr/p public/images/cities/pr/a public/images/cities/pr/c public/images/cities/pr/f

cities=(
  "Paranaguá|public/images/cities/pr/p/paranagua.jpg"
  "Almirante_Tamandaré_(Paraná)|public/images/cities/pr/a/almirante-tamandare.jpg"
  "Piraquara|public/images/cities/pr/p/piraquara.jpg"
  "Campo_Largo_(Paraná)|public/images/cities/pr/c/campo-largo.jpg"
  "Foz_do_Iguaçu|public/images/cities/pr/f/foz-do-iguacu.jpg"
  "Colombo_(Paraná)|public/images/cities/pr/c/colombo.jpg"
  "Pinhais|public/images/cities/pr/p/pinhais.jpg"
  "Fazenda_Rio_Grande|public/images/cities/pr/f/fazenda-rio-grande.jpg"
  "Ponta_Grossa|public/images/cities/pr/p/ponta-grossa.jpg"
)

for city in "${cities[@]}"; do
  name="${city%%|*}"
  path="${city##*|}"
  if [ ! -f "$path" ]; then
    echo "Downloading for $name..."
    url="https://pt.wikipedia.org/wiki/$name"
    # Fetch page, grep for thumb image, take first jpg from infobox usually
    # Pattern: //upload.wikimedia.org/wikipedia/commons/thumb/x/xy/Filename.jpg/Npx-Filename.jpg
    img_url=$(curl -sL "$url" | grep -o '//upload.wikimedia.org/wikipedia/commons/thumb/[^"]*\.jpg' | head -n 1)
    
    if [ -n "$img_url" ]; then
      img_url="https:$img_url"
      # Try to get 800px version
      high_res_url=$(echo "$img_url" | sed -E 's/\/[0-9]+px-/\/800px-/')
      
      echo "Fetching $high_res_url"
      curl -sL "$high_res_url" -o "$path"
      
      # Check if file is valid image (sometimes 800px doesn't exist if original is smaller)
      if ! file "$path" | grep -q "JPEG"; then
         echo "800px failed, trying original thumb ($img_url)"
         curl -sL "$img_url" -o "$path"
      fi
      
      echo "Saved to $path"
    else
      echo "No image found for $name at $url"
    fi
  else
    echo "Image for $name already exists."
  fi
done
