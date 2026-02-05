#!/bin/bash

# Move images from incorrect 'es' folder to correct state folders
find public/images/cities/es -name "*.jpg" | while read img; do
    filename=$(basename "$img" .jpg)
    first_letter=${filename:0:1}
    state=""
    
    case "$filename" in
        "aguas-de-lindoia"|"araras"|"araraquara"|"aral-moreira"|"assis"|"atibaia"|"barueri"|"botucatu"|"braganca-paulista"|"campinas"|"caconde"|"caieiras"|"estiva-gerbi"|"gaviao-peixoto"|"ilha-comprida"|"indaiatuba"|"itatiba"|"itu"|"joanopolis"|"jundiai"|"laguna"|"limeira"|"marilia"|"mogi-guacu"|"monte-alegre-do-sul"|"santana-do-parnaiba"|"sao-carlos"|"sao-jose-dos-campos"|"sao-paulo"|"serra-negra"|"sao-pedro-da-uniao"|"valinhos"|"sacramento"|"alfenas"|"vinhedo"|"campina-grande-do-sul"|"extrema"|"itapevi"|"carapicuiba"|"osasco"|"cabreuva"|"mogi-mirim"|"pocos-de-caldas")
            state="sp"
            ;;
        "alpinopolis"|"betim"|"arceburgo"|"monte-belo"|"muzambinho"|"patos-de-minas"|"pouso-alegre"|"pratapolis"|"sete-lagoas"|"sao-lourenco"|"conselheiro-lafaiete"|"contagem"|"caxambu"|"governador-valadares"|"guaranesia"|"guaxupe"|"ipatinga"|"itajuba"|"itamogi"|"nova-resende"|"tombos"|"uberaba"|"varginha"|"faria-lemos"|"baependi"|"agua-de-santa-barbara"|"passos"|"aiuruoca"|"juruaia"|"piracaia"|"monte-santo-de-minas"|"mococa")
            state="mg"
            ;;
        "chapeco"|"jaragua-do-sul"|"blumenau"|"brusque"|"londrina"|"porto-uniao"|"santa-cruz-do-sul"|"curitiba"|"quatro-barras"|"criciuma"|"maringa"|"joinvile"|"sao-jose-dos-pinhais"|"itajai"|"araucaria")
            state="pr"
            ;;
        "ararangua"|"bento-goncalves"|"caxias-do-sul"|"farroupilha"|"gramado"|"passo-fundo"|"rio-grande"|"vacaria"|"novo-hamburgo"|"lajeado"|"soledade"|"lages")
            state="rs"
            ;;
        "dourados"|"ponta-pora")
            state="ms"
            ;;
        "goiania")
            state="go"
            ;;
        "vitoria"|"linhares")
            state="es"
            ;;
        "natal")
            state="rn"
            ;;
        "joao-pessoa")
            state="pb"
            ;;
        "recife"|"olinda")
            state="pe"
            ;;
        "aracaju")
            state="se"
            ;;
        "rio-de-janeiro"|"teofilo-otoni"|"paulo-afonso")
            state="rj"
            ;;
        "nova-rodelas")
            state="ba"
            ;;
    esac
    
    if [[ -n "$state" ]]; then
        dest_dir="public/images/cities/$state/$first_letter"
        mkdir -p "$dest_dir"
        echo "Movendo $filename.jpg de es/ para $dest_dir/"
        mv "$img" "$dest_dir/$filename.jpg"
    else
        echo "Estado não encontrado para: $filename"
    fi
done

echo "Reorganização concluída!"