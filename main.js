//--SETTINGS--//
const nViewportScrollAnim = 2;  //nombre de viewport à scroll avant la fin de l'anim donc la vue de l'accueil
const popupTally = true;       //affichage du popup questionnaire ?
//----//

const html = document.documentElement;
const buttonScroll = document.querySelector('.buttonScroll');   //"Je répare votre vélo !"
const downArrow = document.querySelector('.downArrow'); //deux flèche en bas

var viewportWidth = window.innerWidth;    //largeur du viewport
var viewportHeight = window.innerHeight;  //hauteur du viewport

const preview = document.querySelector('.preview'); //preview des photos atelier
const gallerie = document.querySelector('.gallerie');   //slider des photos atelier

const previewImgL = document.getElementById('previewL');    //image de gauche preview
const previewImgC = document.getElementById('previewC');    //image du centre preview
const previewImgR = document.getElementById('previewR');    //image de droite preview

const slider = document.querySelector('.slider');       //container slider photos atelier
const slide = document.getElementsByClassName('slide'); //item slider photos atelier
const nItem = slider.childElementCount;    //nombre de photos du slider
var frameAct = (nItem / 2).toFixed();   //photo du slider centrée actuellement

const scrollAccueilStep = nViewportScrollAnim * viewportHeight; //nombre de px entre le début et la fin de l'anim

var device = 'PC';
responcive();

function responcive() {
    const mediaQuery = window.matchMedia('(max-width: 600px)')
    if (mediaQuery.matches) {
        device = 'phone';
    }
}

animAccueil();          //animation du vélo
boutonScroll();         //boutons pour scroller
infoBox();              //popup info
previewClick();         //preview to slider
boutonLocalisation();   //bouton adresse
if (popupTally == true && device == 'PC') {
    tallyPopup();           //popup questionnaire tally
}

onresize = () => {  //si  la taille de la fenêtre est modifier
    viewportWidth = window.innerWidth;    //largeur du viewport est actualiser
    viewportHeight = window.innerHeight;  //hauteur du viewport est actuliser
}

function animAccueil() {    //animaton du vélo

    const anim = document.querySelector('.anim');                   //
    const animContainer = document.getElementById('animContainer'); //
    const title = document.getElementById('title');                 //"Cyrilus Cycles"
    const branding = document.getElementById('branding');           //"Entretien, réparation et montage de vélos."
    const accueil = document.querySelector('.contentAccueil');      //
    const sommaire = document.getElementById('sommaire');           //

    const imgVelo = nImg => (document.getElementById('img' + nImg));    //selectionne l'image, prend en paramètre le numéro de l'image : de 0 à 8
    const nImg = 9; //nombre d'image (utile pour les boucles)

    accueil.style.position = 'fixed';   //met la position de l'accueil sur fixe
    setupTransformPieces();             //translate les pieces du vélo
    txtOpacity('setupOut');             //masque le text de la fin de l'anim

    //tableau qui prend les valeur de tranform X et Y de toutes les images
    var imgTransform = new Array(nImg);     //déclare le tableau
    for (i = 0; i < nImg; i++) {            //à chaque ligne
        imgTransform[i] = new Array(3);     //créé 3 colonne
        getTransformValue(i, imgTransform); //récupère la valeur x et y du transform
    }                                       //

    window.addEventListener('scroll', () => {   //au scroll

        const scrollTop = html.scrollTop;
        const percentScroll = scrollTop / (nViewportScrollAnim * viewportHeight);

        if (percentScroll > 0.25) {
            piecesTranslate('in');
            navOpacity('in');
        } else {
            piecesTranslate('out');
            navOpacity('out');
        }
        if (percentScroll > 0.5) {
            piecesOpacity('in');
            navOpacity('setupOut');
            txtOpacity('setupIn');
        } else {
            piecesOpacity('out');
            txtOpacity('setupOut');
        }
        if (percentScroll > 0.75) {
            piecesScale('in');
            txtOpacity('in');
            bgOpacity('in');
        } else {
            piecesScale('out');
            txtOpacity('out');
            bgOpacity('out');
        }
        if (percentScroll >= 1) {
            accueil.style.position = 'relative';    //la postion de accueil passe de fixed a relative : ne bouge pas au scroll -> bouge au scroll
            anim.style.zIndex = '0';                //l'animation passe en arrière plan, pour laisser le sommaire clickable
            animContainer.classList.remove('anim-before');                  //la class de animContainer passe de "anim-before" à "anima-after"
            animContainer.classList.add('anim-after');                      //l'animation passe de fixed à absolute
        } else {
            accueil.style.position = 'fixed';    //la postion de accueil passe de fixed a relative : ne bouge pas au scroll -> bouge au scroll
            anim.style.zIndex = '1';                //l'animation passe en arrière plan, pour laisser le sommaire clickable
            animContainer.classList.remove('anim-after');                  //la class de animContainer passe de "anim-before" à "anima-after"
            animContainer.classList.add('anim-before');                      //l'animation passe de fixed à absolute
        }

        scrollAdjust(scrollTop);
    });

    function setupTransformPieces() {
        if (device == 'PC') {
            imgVelo(0).style.transform = 'translate(200px, -130px) rotate(3deg)';
            imgVelo(1).style.transform = 'translate(-275px, -100px) rotate(6.5deg)';
            imgVelo(2).style.transform = 'translate(-30px, 200px) rotate(-22deg)';
            imgVelo(3).style.transform = 'translate(-85px, 165px) rotate(-40deg)';
            imgVelo(4).style.transform = 'translate(365px, -130px) rotate(0deg)';
            imgVelo(5).style.transform = 'translate(-70px, 80px) rotate(0deg)';
            imgVelo(6).style.transform = 'translate(255px, 120px) rotate(0deg)';
            imgVelo(7).style.transform = 'translate(-245px, 130px) rotate(0deg)';
            imgVelo(8).style.transform = 'translate(-200px, 5px) rotate(-14deg)';
        } else if (device == 'phone') {
            imgVelo(0).style.transform = 'translate(81px, -264px) rotate(7deg)';
            imgVelo(1).style.transform = 'translate(-83px, 238px) rotate(3deg)';
            imgVelo(2).style.transform = 'translate(-8px, 316px) rotate(-22deg)';
            imgVelo(3).style.transform = 'translate(-33px, 292px) rotate(-40deg)';
            imgVelo(4).style.transform = 'translate(56px, -130px) rotate(0deg)';
            imgVelo(5).style.transform = 'translate(-33px, 249px) rotate(0deg)';
            imgVelo(6).style.transform = 'translate(62px, 139px) rotate(0deg)';
            imgVelo(7).style.transform = 'translate(-20px, -179px) rotate(0deg)';
            imgVelo(8).style.transform = 'translate(-121px, -303px) rotate(-14deg)';
        }
    }

    function getTransformValue(iImg, tab) {    //get transform X and Y
        //découpe la chaine de caractère renvoyer
        const transform = imgVelo(iImg).style.transform;                        //"translate(-800px, 0px) rotate(-14deg)""
        const transformCut = transform.slice(10, transform.length - 4);     //"-800px, 0px) rotate(-14"
        const transformSplit = transformCut.split(')');                     //tranformSplit[0]=="-800px, 0px" tranformSplit[1]==" rotate(-14"
        //pour le translate
        const transformTranslate = transformSplit[0].split(',');                                //tranformTab[0]=="-800px" tranformTab[1]=="0px"
        const transformX = transformTranslate[0].slice(0, transformTranslate[0].length - 2);    //"-800"
        const transformY = transformTranslate[1].slice(1, transformTranslate[1].length - 2);    //"0"
        //pour le rotate
        const transformRotate = transformSplit[1];
        const transformR = transformRotate.slice(8);    //"-14"

        //log les valeurs dans le tableaux
        tab[iImg][0] = transformX; //[ligne][colonne]
        tab[iImg][1] = transformY;
        tab[iImg][2] = transformR;
    }

    function piecesTranslate(type) {
        if (type == 'in') {
            for (i = 0; i < nImg; i++) {
                imgVelo(i).style.transform = 'none';
            }
            imgVelo(9).style.display = 'block';
        } else if (type == 'out') {
            setupTransformPieces();
            imgVelo(9).style.display = 'none';
        }
    }

    function navOpacity(type) {
        if (type == 'in') {
            buttonScroll.style.opacity = '0';
            downArrow.style.opacity = '0';

            buttonScroll.addEventListener('transitionend', () => {
                if (buttonScroll.style.opacity == '0' && buttonScroll.style.display != 'none') {
                    navOpacity('setupOut');
                }
            });
        } else if (type == 'out') {
            navOpacity('setupIn');
            setTimeout(() => {
                buttonScroll.removeAttribute('style');
                downArrow.removeAttribute('style');
            }, 10);
        } else if (type == 'setupIn') {
            buttonScroll.style.display = 'block';
            downArrow.style.display = 'flex';
        } else if (type == 'setupOut') {
            buttonScroll.style.display = 'none';
            downArrow.style.display = 'none';
        }
    }

    function piecesOpacity(type) {
        if (type == 'in') {
            for (i = 0; i < nImg; i++) {
                imgVelo(i).style.opacity = '0';
            }
            imgVelo(9).style.opacity = '1';
        } else if (type == 'out') {
            for (i = 0; i < nImg; i++) {
                imgVelo(i).style.opacity = '1';
            }
            imgVelo(9).style.opacity = '0';
        }
    }

    function piecesScale(type) {
        if (type == 'in') {
            for (i = 0; i < nImg; i++) {
                imgVelo(i).style.display = 'none';
            }
            imgVelo(9).style.transform = 'scale(0.5)';
        } else if (type == 'out') {
            for (i = 0; i < nImg; i++) {
                imgVelo(i).style.display = 'block';
            }
            imgVelo(9).style.transform = 'scale(1)';
        }
    }

    function txtOpacity(type) {
        if (type == 'in') {
            title.style.opacity = '1';
            branding.style.opacity = '1';
        } else if (type == 'out') {
            title.style.opacity = '0';
            branding.style.opacity = '0';
        } else if (type == 'setupIn') {
            title.style.display = 'block';
            branding.style.display = 'block';
        } else if (type == 'setupOut') {
            title.style.display = 'none';
            branding.style.display = 'none';
        }
    }

    function bgOpacity(type) {
        if (type == 'in') {
            animContainer.style.background = 'rgba(255, 255, 255, 0)';
        } else if (type == 'out') {
            animContainer.style.background = 'rgba(255, 255, 255, 1)';
        }
    }

    function scrollAdjust(scrollStart) {   //scroll pour que l'accueil soit centré et cliquable si l'utilisateur reste une seconde sans scroller à proximiter de la zone
        if (scrollStart < (2 * viewportHeight) * 1.20 && scrollStart > (2 * viewportHeight) * 0.70) { //si l'utilisateur est dans la zone (30% avant ou 20% après)
            setTimeout(() => {  //delay 1s
                if (html.scrollTop == scrollStart) {    //si l'utilisateur n'a pas bouger
                    window.scrollTo(0, scrollAccueilStep); //scroll au bon endroit
                }
            }, 1000);
        }
    }
}

function boutonScroll() {   //bouton "je répare mon vélo" et les 2 flèches : au click -> scroll jusqu'à la fin de l'anim 
    buttonScroll.addEventListener('click', () => {  //au click
        window.scrollTo(0, scrollAccueilStep);     //scroll jusqu'a l'accueil
    });
    downArrow.addEventListener('click', () => {     //pareil pour les flèches
        window.scrollTo(0, scrollAccueilStep);     //
    });
}

function infoBox() {    //
    const infoBox = document.querySelector('.infoBox');         //
    const closeButton = document.querySelector('.closeButton');  //croix pour fermé
    const pContent = document.querySelector('.content>p');      //contenu

    var infoOn = true;  //il y a une info ?

    function doGET(path, callback) {    //fait une requette pour avoir le contenu du fichier
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                // The request is done; did it work?
                if (xhr.status == 200) {
                    // ***Yes, use `xhr.responseText` here***
                    callback(xhr.responseText);
                } else {
                    // ***No, tell the callback the call failed***
                    callback(null);
                }
            }
        };
        xhr.open("GET", path);
        xhr.send();
    }

    function handleFileData(fileData) { //gère les données de la requêtte
        if (!fileData) {    //si elle est vide
            // void file
            infoOn = false; //il n'y a pas d'info
            infoBox.style.display = 'none'; //on masque le popup info
        }
        // Use the file data
        pContent.innerHTML = fileData.replace(/\r\n/g, "<br>"); //on remplasse les saut de ligne du fichier text ("\r\n") en saut de ligne html ("<br>")
    }

    // Do the request
    doGET("infos.txt", handleFileData);

    if (infoOn == true) {   //si il y a de l'info

        closeButton.addEventListener('click', () => {   //quand on click sur la croix
            infoBox.style.opacity = '0';    //on mets l'opacité du popup à 0
            closeButton.style.transform = 'rotate(90deg) scale(0.8)';   //on tourne la croix (anim)
            setTimeout(() => {  //delay 0.5s : opacité popup
                infoBox.style.display = 'none'; //on masque le popup
            }, 500);
        });

        dragElement(infoBox); //on rend le popup dragable

        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                // if present, the header is where you move the DIV from:
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:

                const valTop = elmnt.offsetTop - pos2;
                const valLeft = elmnt.offsetLeft - pos1;

                const elmntHeight = elmnt.scrollHeight;
                const elmntWidth = elmnt.scrollWidth;

                if (valTop < viewportHeight - elmntHeight && valTop > 0) {
                    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                }

                if (valLeft < viewportWidth - elmntWidth && valLeft > 0) {
                    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                }
            }

            function closeDragElement() {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
}

function previewClick() {   //click sur la preview pour ouvrir la gallerie

    preview.addEventListener('click', () => {   //quand on click sur la preview

        window.scrollTo(0, (nViewportScrollAnim + 1) * viewportHeight); //au scroll pour être centré sur la preview

        document.body.style.overflow = 'hidden';    //on empêche l'utilisateur de scroll
        const bg = document.querySelector('.gallerie>.bg');

        gallerie.style.display = 'block';   //on affiche le slider
        gallerie.style.opacity = '0';       //avec une opacité de 0
        photos();   //on affiche les photos

        setTimeout(() => {
            animOpen();     //on anima l'ouverture du slider
        }, 100);
    });

    function animOpen() {
        preview.classList.add('preview-active');    //prend toute la fenêtre
        const imgPreviewInGallerie = frameAct - 1;  //img du centre
        const slideL = slide.item(imgPreviewInGallerie - 1);    //img gauche dans la gallerie
        const slideC = slide.item(imgPreviewInGallerie);        //img centre dans la gallerie
        const slideR = slide.item(imgPreviewInGallerie + 1);    //img droite dans la gallerie

        const imgHeight = slideC.clientHeight;      //Hauteur des images
        const imgLeftWidth = slideL.scrollWidth;    //largeur de l'image de gauche
        const imgCenterWidth = slideC.scrollWidth;  //largeur de l'image du centre
        const imgRightWidth = slideR.scrollWidth;   //largeur de l'image de droite

        previewImgL.style.width = imgLeftWidth + 'px';      //Change les tailles de l'image de gauche
        previewImgL.style.height = imgHeight + 'px';        //--
        previewImgC.style.width = imgCenterWidth + 'px';    //Change les tailles de l'image du centre
        previewImgC.style.height = imgHeight + 'px';        //--
        previewImgR.style.width = imgRightWidth + 'px';     //Change les tailles de l'image de droite
        previewImgR.style.height = imgHeight + 'px';        //--

        previewImgL.style.borderRadius = '0';   //
        previewImgC.style.borderRadius = '0';   //on mets les bords des images carré
        previewImgR.style.borderRadius = '0';   //

        setTimeout(() => {  //delay de 0.4s : 

            const diffPreviewL = previewImgL.getBoundingClientRect().x; //longueur entre l'image de gauche de la preview et viewport left
            const diffGallerieL = slideL.getBoundingClientRect().x;     //longueur entre l'image de gauche du slider et viewport left
            previewImgL.style.transform = 'translateX(' + (diffGallerieL - diffPreviewL) + 'px)';   //translate l'image de gauche de la preview au même endroit que l'image du slider

            const diffPreviewR = previewImgR.getBoundingClientRect().x; //longueur entre l'image de droite de la preview et viewport left
            const diffGallerieR = slideR.getBoundingClientRect().x;     //longueur entre l'image de droite du slider et viewport left
            previewImgR.style.transform = 'translateX(' + (diffGallerieR - diffPreviewR) + 'px)';   //translate l'image de droite la preview au même endroit que l'image du slider

            setTimeout(() => {  //delay 0.2s : transition transform
                gallerie.style.opacity = '1';   //affiche le slider
                setTimeout(() => {  //delay 0.5s : transition opacité
                    preview.style.display = 'none'; //masque la preview
                }, 500);
            }, 200);
        }, 400);
    }
}

function photos() { //gallerie

    const slider = document.querySelector('.slider');       //container
    const slide = document.getElementsByClassName('slide'); //item

    const arrowR = document.getElementById('arrowR');   //flèche nav (droite)
    const arrowL = document.getElementById('arrowL');   //(gauche)
    const close = document.querySelector('.close');     //croix

    const nItem = slider.childElementCount;    //nombre de photos

    const elementWidth = new Array(nItem);  //largeur des photos
    var frameAct = (nItem / 2).toFixed();   //photo centrée actuellement

    var animationOn = false;    //animation en cours ?
    var incrementFrame = true;  //max à droite ?
    var decrementFrame = true;  //max à gauche ?

    cdots(nItem);   //créer les points de nav en bas et mets en blanc le bon

    //setTimeout(() => {
    for (i = 0; i < nItem; i++) {   //pour chaque image
        elementWidth[i] = slide.item(i).scrollWidth;    //récupère ça largeur
    }
    center(frameAct);   //centre l'image sélectionner par frameAct
    //}, 500);


    //triger
    //click
    arrowL.addEventListener('click', () => {    //click flèche de gauche
        updateFrame('-');                       //va à l'image à gauche
    });
    arrowR.addEventListener('click', () => {    //click flèche de droite
        updateFrame('+');                       //va à l'image à droite
    });
    document.onkeydown = function (event) { //clavier
        switch (event.keyCode) {
            case 37:                //flèche de gauche
                updateFrame('-');   //va à l'image à gauche
                break;
            case 39:                //flèche de droite
                updateFrame('+');   //va à l'image à droite
                break;
            case 27:
                closeOn();
                break;
        }
    };
    close.addEventListener('click', () => {
        closeOn();
    });

    //

    function center(frame) {    //centre sur l'image n

        const diff = slide.item(frame - 1).getBoundingClientRect().x;   //position x de l'élement par rappport à la gauche du viewport
        const transformAct = getTransformValue();                       //récupère la valeur de transformation actuelle
        const offset = viewportWidth / 2 - elementWidth[frame - 1] / 2; //valeur a ajouter pour centrer un élément coller à gauche du viewport
        const transformValue = (transformAct - diff) + offset;  //"transformAct - diff" pour coller l'élement a gauche du viewport
        //"+ offset" pour le centrer
        slider.style.transform = 'translateX(' + transformValue + 'px)';    //on applique la transformation
    };

    function getTransformValue() {  //récuèpre la valeur de translateX
        const transform = slider.style.transform;                       //"translateX(-124px)"
        const transformCut = transform.slice(11, transform.length - 3); //"-124"
        return transformCut;    //renvoie la valeur
    }

    function updateFrame(operation) {   //affiche l'image suivante ou précedantes
        if (animationOn == false) { //si un changement n'es pas déjà en cours (pour éviter les erreurs lors du calcul de la diff)

            animationOn = true; //on indique qu'on est en trian de faire un changement d'image

            if (operation == '+' && incrementFrame == true) {   //si on affiche l'image suivante et qu'on est pas à la dernière image
                frameAct++;                                     //on ajoute 1 à la frameAct
                updateDots(frameAct);                           //on met en blanc le . en bas correspondant

            } else if (operation == '-' && decrementFrame == true) {    //si on affiche l'image précedante et qu'on est pas à la première image   
                frameAct--;                                             //on enlève 1 à la frameAct
                updateDots(frameAct);                                   //on met en blanc le . en bas correspondant
            }

            arrowR.classList.remove('interactionArrowR');   //on enlève les animations de ":hover" et ":active" des flèches de nav
            arrowL.classList.remove('interactionArrowL');   //

            center(frameAct);   //on centre l'image a afficher

            setTimeout(() => {  //on attend 0.5s le temps que l'animation de slide ce fasse
                animationOn = false;                        //on indique que le changement d'image est fini

                arrowR.classList.add('interactionArrowR');  //on remet les animations de ":hover" et ":active" des flèches de nav
                arrowL.classList.add('interactionArrowL');  //
            }, 500)

            maxFrame(); //on vérifie que on est pas sur la première ou dernière photo
        }
    }

    function maxFrame() {   //vérifie si on est à la première ou dernière photos et adapte l'affichage en fonction
        if (frameAct <= 1) {                    //si on est sur la première photo (tout à gauche)
            decrementFrame = false;             //on indique que on ne peut plus aller à gauche
            arrowL.style.opacity = '0';         //on met l'opacité de la flèche de gauche sur 0

            setTimeout(() => {                  //on attend 0.5s que l'animation ce fasse
                arrowL.style.display = 'none';  //on masque la flèche de gauche
            }, 500);

        } else {    //sinon
            decrementFrame = true;              //reset des valeurs de départ
            arrowL.style.display = 'block';     //
            setTimeout(() => {                  //
                arrowL.style.opacity = '1';     //
            }, 500);
        }

        if (frameAct >= nItem) {    //pareil pour la dernière photo
            incrementFrame = false;
            arrowR.style.opacity = '0';
            setTimeout(() => {
                arrowR.style.display = 'none';
            }, 500);

        } else {
            incrementFrame = true;
            arrowR.style.display = 'block';
            setTimeout(() => {
                arrowR.style.opacity = '1';
            }, 500);
        }
    }

    function cdots(n, frame) {  //créer les . de nav et met en blanc celui de départ
        const nNewElement = n - document.getElementsByClassName('dot').length;
        for (i = 0; i < nNewElement; i++) {   //pour chaque photos
            var div = document.createElement('div');        //crée une div
            var element = document.querySelector('.dots');  //dans la div ayant la class "dots" (container)
            element.appendChild(div).classList.add('dot');  //avec la class "dot" (pour faire un rond)
        }
        updateDots(frameAct);   //met en blanc celui de départ
    };

    function updateDots(n) {    //met en blanc le . n
        const dot = document.getElementsByClassName('dot');         //Sélectionne les .
        for (i = 0; i < nItem; i++) {                               //pour chaque .
            dot.item(i).style.background = 'rgb(150, 150, 150)';    //le met en gris
        }
        dot.item(n - 1).style.background = 'white'; //met le point actuel en blanc 
    }

    function closeOn() {
        center((nItem / 2).toFixed());

        setTimeout(() => {
            preview.removeAttribute('style');   //on affiche la preview
            gallerie.style.opacity = '0';   //on mets l'opacité du slider à 0

            setTimeout(() => {  //delay 0.5s : transition opacité slider
                previewImgL.removeAttribute('style');   //
                previewImgC.removeAttribute('style');   //animation des images redeviennent comme au début
                previewImgR.removeAttribute('style');   //
                preview.classList.remove('preview-active'); //réaffiche la preview comme au début

                setTimeout(() => {
                    gallerie.style.display = 'none';
                    document.body.removeAttribute('style');
                }, 300);
            }, 500)
        }, 500);
    }
}

function boutonLocalisation() { //animation bouton localisation avec l'adresse

    const container = document.getElementById('containerBouton');
    const bouton = document.getElementById('bouton');   //bouton adresse : "condrieu"
    const infos = document.getElementById('infos');     //content bouton adresse

    var animationOn = false;  //(pour éviter de lancer des animation pendant les animation et faire des bugs)

    container.addEventListener('click', (e) => {    //e = target du click

        if (animationOn != true) {    //si une animation n'est pas en cours
            if (bouton.style.display != 'none') {   //si le bouton est à l'état plié

                animationOn = true;   //animation en cours

                const widthBefore = bouton.scrollWidth;   //récupère les tailles durs 
                const heightBefore = bouton.scrollHeight; //du bouton plié affiché avec des tailles auto

                bouton.style.width = widthBefore - 30 + 'px';   //fixe la taille du bouton en dur
                bouton.style.height = heightBefore - 30 + 'px'; //(visuellement pas de dif)

                infos.style.display = 'flex';           //affiche le bouton déplié (avec une opacité de 0 donc on ne le voie pas)
                const widthAfter = infos.scrollWidth;     //pour récupérer les tailles dur
                const heightAfter = infos.scrollHeight;   //

                bouton.style.width = widthAfter - 30 + 'px';    //on applique les tailles en dur
                bouton.style.height = heightAfter - 30 + 'px';  //

                setTimeout(() => {  //delay de 0.5s, le temps que les transition width et height ce fasse
                    infos.style.zIndex = 0;     //on mets le bouton déplié devant 
                    infos.style.opacity = 1;    //avec une opacité de 1 pour le voir
                    bouton.style.opacity = 0;   //on mets une opacité de 0 au bouton plié pour le masque

                    setTimeout(() => {  //delay 0.5s
                        bouton.style.display = 'none';  //on masque de bouton plié

                        bouton.style.width = 'auto';    //on remet les tailles du bouton plié et déplié
                        bouton.style.height = 'auto';   //en auto
                        infos.style.width = 'auto';     //
                        infos.style.height = 'auto';    //

                        animationOn = false;    //animation finis
                    }, '500');

                }, '500');

            } else if (e.target.id != 'lien') { //si le bouton est à l'état déplié 

                animationOn = true; //animation en cours

                const widthAfter = infos.scrollWidth;     //récupère les tailles durs du bouton déplié
                const heightAfter = infos.scrollHeight;   //

                infos.style.width = widthAfter - 30 + 'px';     //fixe la taille du bouton en dur
                infos.style.height = heightAfter - 30 + 'px';   //

                bouton.style.display = 'flex';          //affiche le bouton plié (avec une opacité de 0 donc on ne le voie pas)
                const widthBefore = bouton.scrollWidth;   //pour récupérer les tailles dur
                const heightBefore = bouton.scrollHeight; //

                bouton.style.width = widthAfter - 30 + 'px';    //le bouton plié prend les tailles du bouton déplié
                bouton.style.height = heightAfter - 30 + 'px';  //
                bouton.style.zIndex = '1';                      //mets le bouton plié devant
                bouton.style.opacity = '1';                     //affiche le bouton plié

                setTimeout(() => {                  //delay 0.1s, transition opacité
                    infos.style.display = 'none';   //cache le bouton déplié
                    bouton.style.width = widthBefore - 30 + 'px';   //donne les tailles plié au bouton plié
                    bouton.style.height = heightBefore - 30 + 'px'; //

                    setTimeout(() => {  //deplay 0.5s, transition tailles
                        // bouton.style.zIndex = '0';      //opacité à 0
                        // bouton.style.width = 'auto';    //tailles en auto
                        // bouton.style.height = 'auto';   //
                        bouton.removeAttribute('style');

                        // infos.style.opacity = '0';      //opacité à 0
                        // infos.style.width = 'auto';     //trailles en auto
                        // infos.style.height = 'auto';    //
                        // infos.style.display = 'none';   //masque le bouton déplié
                        infos.removeAttribute('style');

                        animationOn = false;    //animation finis
                    }, '500');
                }, '200');

            }
        }
    });
}

function tallyPopup() { //questionaire sur le site
    const percentTriger = 0.9;

    const html = document.documentElement;

    const scrollHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const pageHeight = scrollHeight - viewportHeight;

    var tallyOn = false;

    window.addEventListener('scroll', () => {
        const scrollTop = html.scrollTop;
        const percentScroll = (scrollTop / pageHeight).toFixed(2);
        if (percentScroll > percentTriger && tallyOn == false) {
            tallyOn = true;
            Tally.openPopup('3lbKPk');
        }
    });
}