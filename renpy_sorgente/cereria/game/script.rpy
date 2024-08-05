
### PERSONAGGI

#  Per prima cosa devi associare il nome di una famiglia di immagini al personaggio. Quando scrivi "e" Ren'py andrà a cercare tra le foto il cui nome comincia con "elena".
define deb = Character("Debora", color="#f44", image="debora")
define mar = Character("Maria", color="#09e840", image="maria")
# Menu 
define menur = Character("Maria", color="#09e840", image="menu")

### IMMAGINI    
## Debora
image debora = "debora.png"
image debora ascolta = "debora ascolta.png"
image debora saluta = "debora.png" # TO DO: CAMBIARE IMMAGINE
## Maria
image maria = "maria.png"
image maria ascolta = "maria ascolta.png"
image maria saluta = "maria.png" # TO DO: CAMBIARE IMMAGINE

## THUMBNAILS
## Debora
image side debora parla = "side_debora.png"
image side debora sorpresa = "side_debora_sorpresa.png"
image side debora sorride = "side_debora_sorride.png"
image side debora segreto = "side_debora_segreto.png"
image side debora punta = "side_debora_punta.png"
## Maria
image side maria parla ="side_maria.png"
image side maria domanda = "side_maria_domanda.png"
image side maria sorpreso ="side_maria_sorpreso.png"
image side maria segreto = "side_maria_segreto.png"
image side maria punta = "side_maria_punta.png"


## CONSTANTS
## Left character
define debora_xpos = -0.09
define debora_ypos = 0.15
define debora_zoom = 0.46
## Right character
define maria_xpos = 0.05
define maria_ypos = 0.21
define maria_zoom = 0.43




label start:

    #########################################
    ## SECTION: Intro              ##########
    #########################################

    scene bg cereria
    
    show bg cereria:
        subpixel True ypos 1.12 zoom 1.54 

    # Maria is the rightmost character
    show maria onlayer rightmostcharacter:
        xpos maria_xpos ypos maria_ypos zoom maria_zoom

    # Debora is the leftmost character
    show debora ascolta onlayer leftmostcharacter:
        xpos debora_xpos ypos debora_ypos zoom debora_zoom

    deb "Benvenuti nella Gaita San Pietro. Qui sorge la cereria, annessa alla bottega degli speziali."
    mar "In questi locali venivano prodotti gli stoppini di canapa e le candele per uso religioso o quotidiano."
    deb "Andiamo a vedere come il mastro ceraiolo creava i famosi “doplero”."

    show maria ascolta onlayer rightmostcharacter:
        xpos maria_xpos ypos maria_ypos zoom maria_zoom

    show debora onlayer leftmostcharacter:
        xpos debora_xpos ypos debora_ypos zoom debora_zoom

    #########################################
    ## SECTION: Menu               ##########
    #########################################

    menu content:

        menur "Cosa vuoi sapere?"

        "Canapa":
            hide debora onlayer leftmostcharacter
            hide maria onlayer rightmostcharacter
            jump canapa
        
        "Cera":
            hide debora onlayer leftmostcharacter
            hide maria onlayer rightmostcharacter
            jump cera 

        "Simbolismo":
            hide debora onlayer leftmostcharacter
            hide maria onlayer rightmostcharacter
            jump simbolismo

        "Ok, grazie. Non ho altre curiosità.":
            jump congedo


    #########################################
    ## SECTION: Canapa   ##########
    #########################################

    label canapa:

    show bg canapa:
        subpixel True ypos 1.03 zoom 1.5 

    #########################################
    ## SECTION: Scena 1  ##########
    #########################################

    deb parla "Senza la canapa, niente luce! Da questa pianta si creava lo stoppino, necessario alla combustione."

    deb punta "La canapa è una delle piante più antiche al mondo."

    deb "Grazie alla sua versatilità fu usata per molti scopi."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar parla "...Soprattutto per la creazione delle candele!"

    deb parla "Vediamo come veniva impiegata!"

    #########################################
    ## SECTION: Scena 2  ##########
    #########################################
    
    show bg candela:
        subpixel True ypos 1.23 zoom 0.92 

    deb "Per fare le candele, si partiva dai fili di canapa."

    deb punta "Lo stoppino fatto con questo materiale, era economico, resistente e bruciava bene."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar punta "Ma non finiva qui. Della canapa non si buttava via niente!"

    deb sorpresa "Vero!"

    #########################################
    ## SECTION: Scena 3  ##########
    #########################################
    
    show bg corda

    deb parla "I semi, l'olio e la farina erano impiegati per uso alimentare."

    deb "Le fibre per uso tessile e per fare corde e vele."

    mar parla "Era impiegata anche in cosmesi e medicina."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    deb sorride "Con la canapa insomma si faceva tutto ed è stato così per molto tempo..."

    mar sorpreso "Già, ma non mi hai detto da dove arriva questa pianta!"

    #########################################
    ## SECTION: Scena 4  ##########
    #########################################

    show bg storia:
        subpixel True pos (0.49, 2.08) zoom 3.9 

    deb parla "Secondo alcuni studiosi la canapa risale alle prime società agricole dell'Asia Centrale."

    deb "Nel Medioevo in Italia i maggiori centri di produzione erano Ferrara e Bologna."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar segreto "Diciamola tutta,  veniva usata anche per tirare su il morale..."

    deb sorpresa "Infatti fu proibita in molti periodi..."

    #########################################
    ## SECTION: Scena 5  ##########
    #########################################
    
    show bg illegale:
        subpixel True pos (0.5, 1.57) zoom 2.25 

    deb punta "Nel corso dei secoli ci furono molte proibizioni dell'uso della canapa, per i suoi effetti ricreativi. "

    deb parla "Anche se per proibizionismo ci si riferisce al Marihuana Tax Act emanato dagli USA nel 1937."


    ## End of this section 
    jump backtocontentmenu

    #########################################
    ## SECTION: Cera      ##########
    #########################################

    label cera:

    #########################################
    ## SECTION: Scena 1  ##########
    #########################################

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar parla "L'impiego della cera d'api per fare le candele, è stata una vera manna dal cielo!"

    deb sorpresa "Perché?"

    mar "Perché ci ha finalmente liberati dal puzzo del sego! "

    show bg sego:
        subpixel True pos (0.5, 1.0) 

    mar "Prima della cera d'api, le candele erano prodotte dal sego."

    mar "ottenuto dal grasso di ovini e bovini che produceva un odore terribile."

    mar "Al contrario la cera d'api era nobile e profumata, ma molto costosa."

    mar "Il suo uso rimase limitato ai ricchi, alle chiese e agli eventi reali."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    deb sorpresa "Certo la cera d'api è tutta un'altra storia, anche se c'era dietro un gran lavoro..."

    mar "Lavoro e preghiera dirai!"

    #########################################
    ## SECTION: Scena 2  ##########
    #########################################

    show bg apicoltore 

    mar "Nel Medioevo gli apicoltori erano principalmente uomini di chiesa."

    mar "Dagli alveari producevano miele, idromele e cera per la fabbricazione delle candele."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar "I conventi con i loro grandi giardini erano ideali per accogliere le arnie."

    deb "A proposito, come erano fatte le arnie?"

    #########################################
    ## SECTION: Scena 3  ##########
    #########################################
    
    show bg arnie:
        subpixel True ypos 1.13 zoom 1.5 

    mar "Le prime Arnie o bugni villici, erano costituite da un tronco cavo. "

    mar "Garantivano un luogo riparato dalle intemperie, alle api allevate dall'uomo."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar "E poi arrivava il momento della raccolta!"

    deb "Conosciamo tutti quella del miele, ma per la cera?Come si fa?"

    #########################################
    ## SECTION: Scena 4  ##########
    #########################################
    
    show bg centrifuga:
        subpixel True ypos 1.18 zoom 1.5 

    mar "Con la centrifuga, una serpentina riscaldata che separa la cera dal miele."

    mar "La cera galleggia in superficie perché leggera. Il miele cade sul fondo."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    deb sorpresa "Geniale! E una volta separata, cosa succedeva?"

    mar "Andava raffinata!"

    #########################################
    ## SECTION: Scena 5  ##########
    #########################################
    
    show bg bagnomaria:
        subpixel True pos (0.5, 1.02) zoom 1.88 

    mar "Per separare la cera da residui e impurità si usava la tecnica a bagnomaria."

    #########################################
    ## SECTION: Scena 6  ##########
    #########################################

    deb "Certo, oggi la cera è impiegata molto di più."
        
    mar "In realtà, dalla notte dei tempi, la cera ha sempre avuto molti utilizzi. E ancora oggi è così!"

    deb sorpresa "Un esempio?"

    show bg cosmetici:
        subpixel True pos (0.5, 1.46) zoom 2.25 

    mar "Era impiegata nella produzione dei cosmetici, grazie alle proprietà emollienti."

    deb parla "Voi pensate sempre alla bellezza!"

    mar "In realtà l'uso della cera nel Medioevo era davvero infinito!"

    #########################################
    ## SECTION: Scena 7  ##########
    #########################################
    
    show bg cerotto:
        subpixel True ypos 1.9 zoom 2.0 

    mar "Ad esempio, da dove credete che arrivi la parola cerotto? Dal greco, kērōtón cioè ‘unguento di cera’."

    mar "La cera si usava come un cerotto. Proteggeva dai batteri, impermeabilizzando l'area."

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    deb "E dove posso acquistare la cera per fare le candele?"

    #########################################
    ## SECTION: Scena 8  ##########
    #########################################
    
    show bg spezieria

    mar "Nella bottega dello speziale! Lui produce e vende medicine, unguenti, lassativi, cera, candele e spezie."


    ## End of this section 
    jump backtocontentmenu

    #########################################
    ## SECTION: Simbolimso  ##########
    #########################################

    label simbolismo:

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    mar parla "Come abbiamo fatto a riprodurre le  candele originali?"

    deb parla "Studiando le fonti, le architetture e le opere d'arte!"

    mar "Ed è proprio nelle opere d'arte che abbiamo incontrato il Doplero."

    #########################################
    ## SECTION: Scena 1  ##########
    #########################################

    show bg candela:
        subpixel True ypos 1.23 zoom 0.92  

    deb "Il doppiero,è formato da due candele intrecciate."

    mar "La sua forma a spirale, ha un forte simbolismo legato al divino, all'Ascensione."
    
    show bg bevagna:
        subpixel True ypos 1.31 zoom 1.5

    deb "Questa forma torna anche in architettura:"

    window auto hide
    show bg bevagna:
        subpixel True 
        ypos 1.31 zoom 1.5
        linear 1.50 pos (-0.33, 2.42) zoom 1.5 

    show bg bevagna:
        subpixel True pos (-0.11, 2.52) zoom 3.63

    show mascheracolori onlayer lights

    show mascheracolori onlayer lights:
        subpixel True pos (0.28, 1.03) zoom 1.57

    deb "Le colonne tortili, dette anche salomoniche, avevano la stessa simbologia."

    hide mascheracolori onlayer lights

    
    show bg cereria:
        subpixel True pos (0.5, 1.1) zoom 1.5 

    mar "Ma c'è un'opera in particolare, dove il Doplero è in primo piano."

    deb "È un'opera molto importante e si trova a pochi km da noi. Parliamo del ciclo di Assisi di Giotto!"

    #########################################
    ## SECTION: Scena 2  ##########
    #########################################
    
    show bg giotto:
        subpixel True pos (0.5, 1.35) zoom 3.1 

    mar "Giotto raffigura il doppiero, retto dai chierici, nell'affresco della morte di San Francesco, ad Assisi."

    show mascheracolori onlayer lights
    
    show mascheracolori onlayer lights:
        subpixel True pos (0.26, 1.02) zoom 1.86 

    deb "Ma c'è un altro affresco che reca testimonianza di questi ceri cerimoniali!"

    mar "Nella cappella Bardi, Chiesa di Santa Croce a Firenze, Giotto dipinge un'altra morte di San Francesco, in cui riproduce i Doppiero."

    #########################################
    ## SECTION: Scena 3  ##########
    #########################################

    deb "Ricorrenti nell'iconografia dell'epoca, questi ceri solenni erano utilizzati principalmente nelle cerimonie liturgiche."

    mar "Ma c'è anche un libro prezioso in cui ricorre l'iconografia dei nostri doplero."

    #########################################
    ## SECTION: Scena 4  ##########
    #########################################

    hide mascheracolori onlayer lights
    
    show bg tacuino:
        subpixel True ypos 1.32 zoom 0.85 

    deb "È l'ultima fonte a cui abbiamo attinto ed è il Tacuinum Sanitatis, con l'immagine del venditore di candele."



    ## End of this section 
    jump backtocontentmenu


    #########################################
    ## Brings back to content menu ##########
    #########################################

    label backtocontentmenu:

    show bg cereria:
        subpixel True ypos 1.1 zoom 1.52 

    show maria ascolta onlayer rightmostcharacter:
            xpos maria_xpos ypos maria_ypos zoom maria_zoom

    show debora onlayer leftmostcharacter:
            xpos debora_xpos ypos debora_ypos zoom debora_zoom

    jump content

    ############################################
    ## SECTION: Greetings ######################
    ############################################

    label congedo:

        show maria saluta onlayer rightmostcharacter:
            xpos maria_xpos ypos maria_ypos zoom maria_zoom

        show debora saluta onlayer leftmostcharacter:
            xpos debora_xpos ypos debora_ypos zoom debora_zoom

        mar "Grazie per aver visitato la Cereria!"

        deb "Arrivederci a presto!"

        return

