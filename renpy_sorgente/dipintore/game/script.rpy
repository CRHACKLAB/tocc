
### PERSONAGGI

#  Per prima cosa devi associare il nome di una famiglia di immagini al personaggio. Quando scrivi "e" Ren'py andrà a cercare tra le foto il cui nome comincia con "elena".
define ele = Character("Elena", color="#f44", image="elena")
define leo = Character("Leonardo", color="#09e840", image="leonardo")

### IMMAGINI
## Elena
image elena = "elena.png"
image elena ascolta = "elena ascolta.png"
image elena saluta = "elena.png" # TO DO: CAMBIARE IMMAGINE
## Leonardo
image leonardo = "leonardo.png"
image leonardo ascolta = "leonardo ascolta.png"
image leonardo saluta = "leonardo.png" # TO DO: CAMBIARE IMMAGINE

## THUMBNAILS
## Elena
image side elena parla = "side_elena.png"
image side elena domanda = "side_elena_domanda.png"
image side elena sorpresa = "side_elena_sorpresa.png"
image side elena sorride = "side_elena_sorride.png"
image side elena segreto = "side_elena_segreto.png"
image side elena punta = "side_elena_punta.png"
## Leonardo
image side leonardo parla ="side_leonardo.png"
image side leonardo sorpreso ="side_leonardo_sorpreso.png"
image side leonardo punta ="side_leonardo_punta.png"
image side leonardo domanda ="side_leonardo_domanda.png"
## CONSTANTS
## Left character
define elena_xpos = -0.1
define elena_ypos = 0.1
define elena_zoom = 0.50
## Right character
define leonardo_xpos = 0.02
define leonardo_ypos = 0.17
define leonardo_zoom = 0.44






label start:

    #########################################
    ## SECTION: Intro              ##########
    #########################################

    scene bg bottega

    # Leonardo is the rightmost character
    show leonardo onlayer rightmostcharacter:
        xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

    # Elena is the leftmost character
    show elena ascolta onlayer leftmostcharacter:
        xpos elena_xpos ypos elena_ypos zoom elena_zoom

    leo "Benvenuti nella Bottega del Dipintore nella Gaita San Giorgio."

    show leonardo ascolta onlayer rightmostcharacter:
        xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

    show elena onlayer leftmostcharacter:
        xpos elena_xpos ypos elena_ypos zoom elena_zoom

    ele "Insieme faremo un viaggio nel tempo, tra pigmenti e strumenti di chi, nel medioevo, creava bellezza."

    #########################################
    ## SECTION: Menu               ##########
    #########################################

    menu content:

        ele "Cosa vuoi sapere?"

        "Sapete dirmi qualcosa sull'arte dei colori?":
            hide elena onlayer leftmostcharacter
            hide leonardo onlayer rightmostcharacter
            jump colori
        
        "Vorrei saperne di più sugli Affreschi":
            jump affreschi 

        "Quali erano gli strumenti più utilizzati?":
            jump strumenti

        "Cosa è la \"doratura\"?":
            jump doratura

        "Ok, grazie. Non ho altre curiosità.":
            jump congedo


    #########################################
    ## SECTION: L'Arte dei Colori  ##########
    #########################################

    label colori:
        scene bg dipintore with dissolve
        leo parla "Partiamo dalle basi: la preparazione del colore."
        extend "\nUn lavoro lento e meticoloso."

        show bg bancocolori:
            ypos 1.03 zoom 0.49 
        with dissolve

        ele parla "I pigmenti colorati impiegati nella pittura a fresco erano principalmente naturali o \"poveri\"."

        ele parla "Ocre, terre, verdi e bianco San Giovanni erano i più resistenti alla carbonatazione."

        ele parla "Gli studi alchemici portarono alla creazione di pigmenti in modo artificiale, ampliando la gamma."
        extend "\nIl più famoso di essi è il blu oltremare, ottenuto dal lapislazuli. Vediamolo insieme!"

        window auto hide
        show bg bancocolori:
            subpixel True 
            pos (0.5, 1.03) zoom 0.49 
            linear 2.00 pos (1.12, 2.1) zoom 1.09 
        with Pause(2.10)
        show bg bancocolori:
            pos (1.12, 2.1) zoom 1.09 
        window auto show

        show mascheracolori onlayer lights

        show mascheracolori onlayer lights:
            pos (-0.25, 1.02) zoom 2.56 
        with dissolve

        leo "Prima il colore del divino era il rosso. Poi arriva il blu oltremare e tutto cambia."

        leo "Questo blu prezioso e costoso era ottenuto dal lapislazuli, una pietra colorata originaria dell'Afghanistan."

        leo "Da qui il nome \"oltremare\", e da qui anche la sua esclusività. La sua alternativa  più economica e più scadente era l’azzurrite."

        ele domanda "Va bene. Il blu oltremare era il principe dei colori.\nMa immagino che ce ne fossero altri preziosi..."

        leo "Certo!"
        extend "\nPer esempio, il verde malachite! Ricavato da un'altra pietra colorata."

        window auto hide
        show bg bancocolori:
            subpixel True 
            pos (1.12, 2.1) 
            linear 2.00 pos (0.5, 1.03) 
        show mascheracolori onlayer lights:
            subpixel True 
            pos (-0.25, 1.02) zpos 0.0 
            linear 2.00 pos (-0.18, 1.29) zpos 0.0 
        with Pause(2.10)
        show bg bancocolori:
            pos (0.5, 1.03) 
        show mascheracolori onlayer lights:
            pos (-0.18, 1.29) zpos 0.0 
        window auto show
        
        leo "Sapevi che è un colore velenoso?"

        ele @sorpresa "No! Non lo sapevo!" # Con @ il modificatore si applica solo a questa battuta

        leo "Eh sì! Ma per via della sua ottima coprenza su affresco, tempera e olio, veniva comunque largamente impiegato dagli artisti."

        ele @sorride "Mi mostri un altro colore, per piacere?"

        leo "Certo! Il nero più famoso era il nerofumo, o fuliggine o nero bugia o nero di candela. Era composto principalmente da carbone."

        window auto hide
        show bg bancocolori:
            subpixel True 
            pos (0.5, 1.03) 
            linear 2.00 pos (0.32, 1.71) 
        show mascheracolori onlayer lights:
            subpixel True 
            pos (-0.18, 1.29) zoom 2.56 
            linear 2.00 pos (-0.05, 1.34) zoom 2.38 
        with Pause(2.10)
        show bg bancocolori:
            pos (0.32, 1.71) 
        show mascheracolori onlayer lights:
            pos (-0.05, 1.34) zoom 2.38 
        window auto show

        leo "Il nerofumo era facile da reperire, perché prodotto dalla combustione incompleta di legni, resine e corpi grassi di origine  vegetale e animale."

        ele domanda "E come venivano create le ombre?"

        leo "Con il verdiccio, il pass partout per dare ombra e profondità."

        window auto hide
        show bg bancocolori:
            subpixel True 
            pos (0.32, 1.71) 
            linear 2.00 pos (0.04, 2.12) 
        show mascheracolori onlayer lights:
            subpixel True 
            pos (-0.05, 1.34) zoom 2.38 
            linear 2.00 pos (0.03, 1.08) zoom 1.97 
        with Pause(2.10)
        show bg bancocolori:
            pos (0.04, 2.12) 
        show mascheracolori onlayer lights:
            pos (0.03, 1.08) zoom 1.97 
        window auto show

        leo "Con una pennellata si delineavano visi di donna, sfondi, pesci, barbe, paesaggi e capigliature."

        ele domanda "Qual era il colore più famoso?"

        leo "Uno dei colori più importanti sulle tavolozze degli artisti è il rosso vermiglio, un colore il cui utilizzo si perde nella notte dei tempi."

        window auto hide
        show bg bancocolori:
            subpixel True 
            ypos 2.12 
            linear 2.00 ypos 2.69 
        with Pause(2.10)
        show bg bancocolori:
            ypos 2.69 
        window auto show

        leo "Le prime tracce le troviamo infatti nelle pitture murali neolitiche!"
        extend "\nIl vermiglio si otteneva dal cinabro, un minerale rosso contenente solfuro di mercurio."

        window auto hide
        show bg bancocolori:
            subpixel True 
            pos (0.04, 2.69) 
            linear 2.00 pos (0.34, 3.0) 
        show mascheracolori onlayer lights:
            subpixel True 
            pos (0.03, 1.08) zoom 1.97 
            linear 2.00 pos (-0.11, 1.04) zoom 2.32 
        with Pause(2.10)
        show bg bancocolori:
            pos (0.34, 3.0) 
        show mascheracolori onlayer lights:
            pos (-0.11, 1.04) zoom 2.32 
        window auto show

        ele domanda "Aspetta! Lì dentro che cosa c'è?"

        leo "Quello è il bianco San Giovanni!"

        show bg bianco:
            pos (0.46, 1.41) xzoom 1.0 zoom 0.58 
        with dissolve

        leo "Cennino Cennini diceva che non c'era niente di meglio del bianco San Giovanni per dipingere gli incarnati negli affreschi."

        leo "Conosciuto anche come il “bianco che nasce dal bianco”, è un colore dall'aurea mitica che non esiste in commercio."
    
        leo "Veniva ottenuto dalla calce spenta, seccata e macinata più volte."


        ele @segreto "In alternativa c'era un altro tipo di bianco, ma è meglio non parlarne..."

        leo "Perché?"

        show bg biacca:
            subpixel True pos (0.55, 1.65) zoom 2.22 
        show mascheracolori onlayer lights:
            subpixel True xpos 0.11 zoom 1.82 
        with dissolve

        ele "La biacca metteva a dura prova chi la produceva! Per ottenerla si usava il metodo \"olandese\". "
        extend "Si mettevano lamine di piombo nei vasi, si versava sopra l'aceto e si ricopriva tutto con letame!"

        ele "La reazione chimica produceva la biacca, velenosa e non adatta alla pittura a fresco."

        leo "Perché non si poteva usare per gli affreschi?"

        ele "Ne sa qualcosa Cimabue. Nella sua \"Crocifissione\" di Assisi la biacca ha assorbito l'umidità diventando nera in poco tempo."

        leo @sorpreso "Ma allora i colori erano pericolosi per la salute!"

        ele "No, in genere no. Ma alcuni erano velenosi; in particolar modo il bianco perchè ricavato dal piombo!"

        ## TO DO Questa immagine va sistemata e gestita come tutte le altre.

        show bg piombo:
            subpixel True ypos 1.14 zoom 1.17 
        with dissolve
        hide mascheracolori onlayer lights

        ele "Il bianco era un colore amato dagli artisti per creare colpi di luce nei dipinti e negli affreschi."

        ele "Ma era talmente tossico che provocava il Saturnismo, una malattia causata dall'inalazione o assorbimento dei composti di piombo."

        ## TO DO: Anche questa schermata va sistemata.


        show bg bancocolori:
            subpixel True zoom 0.54 
        with dissolve

        leo "Ecco! Ora conosci un po' meglio l'arte dei colori nel medioevo."

        ele "Prosegui per indagare su un nuovo argomento!"

        ## End of this section 
        jump backtocontentmenu

    #########################################
    ## SECTION: Gli affreschi      ##########
    #########################################

    label affreschi:
        show bg bottega

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        leo "Ora entriamo nel vivo della Bottega! Andiamo a scoprire la tecnica dell'Affresco."


        show leonardo ascolta onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "Anche qui era fondamentale la preparazione. Quindi partiamo dall'intonaco!" 

        show bg parete affresco:
            subpixel True zoom 0.51
        with dissolve

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        
        leo "Ogni mattina si stendeva l'intonaco sulla porzione di muro che andava dipinta in giornata."
        
        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom      
  
        leo "Si programmavano poi i confini delle porzioni successive. "
 
        show leonardo ascolta onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom
        ele "Chi stendeva la malta non doveva sormontare o scalfire le parti già dipinte!"
        
        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        leo "La superficie doveva essere liscia e compatta, solo così gli affreschi avrebbero resistito al passare del tempo." 

        show leonardo ascolta onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena  onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "Siamo arrivati al disegno. Vediamo insieme come veniva eseguito!"

        show bg  affresco:
            subpixel True zoom 0.51 
        with dissolve 

        hide elena onlayer leftmostcharacter
        hide leonardo onlayer rightmostcharacter

        leo parla "Negli affreschi grandi il disegno veniva fatto sull'arriccio per testare proporzioni e composizione della scena."

        ele parla "Sui più piccoli il disegno si faceva direttamente sulla parte da dipingere."

        show bg disegno:
            subpixel True pos (0.5, 1.54) zoom 0.72 
        with dissolve  

        leo sorpreso "Curiosità: Per fare il disegno si impiegava una terra rossa proveniente dalla città di Sinope in Turchia, da cui il nome Sinopia."

        show bg affresco:
            subpixel True zoom 0.67 
        with dissolve 

        ele  "Bene, ora che abbiamo visto come veniva eseguito il disegno, passiamo alla pittura!"

        leo parla "Era qui che i grandi artisti si esprimevano al meglio."

        show bg pittura:
            subpixel True ypos 2.25 zoom 0.7 
        with dissolve 

        leo "Per dipingere ad Affresco è necessaria pratica, esperienza e sensibilità dell'affreschista."
        leo  "Per cominciare la pittura, la superficie deve “tenere” sotto il pennello."

        ele punta  "L'umido della calce, deve “tirare” per trattenere e fissare i colori."

        show bg affresco:
            subpixel True ypos 1.04 
        with dissolve 

        leo domanda "Sapevi che ogni colore aveva un significato preciso?"

        ele sorpresa "No! Non lo sapevo!"

        leo punta "Vediamone uno, ad esempio... il giallo!"

        show bg semantica:
            subpixel True zoom 0.54 
        with dissolve

        leo parla "Il giallo perse il suo significato positivo, dopo l'avvento dell'oro nel XIII secolo." 
        leo sorpreso "Quanto più il giallo tendeva al verde, tanto più era considerato negativo."

        ele segreto "Non a caso veniva usato per connotare i traditori, come Giuda."
        ele domanda "E ora cosa vogliamo scoprire?"


        jump backtocontentmenu

    #########################################
    ## SECTION: Gli strumenti  ##########
    #########################################

    label strumenti:
        
        show bg bottega

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        leo "Di cosa parliamo ora?"

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "Della cosa più importante!"

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        leo "Le opere del dipintore?"

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "No, i suoi strumenti!"

        show bg carboncino
        with dissolve

        hide elena onlayer leftmostcharacter
        hide leonardo onlayer rightmostcharacter

        ele parla "Partiamo da lui. Sapevi che il carboncino è il più antico strumento per disegnare usato dall'uomo?"

        leo sorpreso "No, non lo sapevo!"

        ele parla "È ottenuto da rametti di legno carbonizzato ed era largamente impiegato dagli artisti per il disegno preparatorio dell'affresco." 
        ele punta "Con il carboncino si tracciavano i chiaroscuri,che davano profondità e movimento all'opera."

        leo punta "Ed ora passiamo a un altro “indispensabile” della bottega?"

        ele "L'occorrente per produrre i pigmenti!"

        show bg dipintore
        with dissolve 

        ele sorride "Ottenuta la materia prima, terre, carbone, minerali, si iniziava a preparare il colore."
        ele punta "Il primo passo era setacciare il materiale, per togliere le impurità."
        
        leo parla "Poi si passava a una lastra di pietra dove con un pestello si riduceva il materiale in polvere."
        leo punta "Era un lavoro lungo, noioso e faticoso, spesso riservato a garzoni stipendiati o apprendisti."
    
        ele sorpresa "Dalla polvere, al colore!"

        show bg tavola
        with dissolve

        ele sorride "Così appariva la bottega del dipintore, una tavola apparecchiata di colori, con ciotole piene di pigmenti."
        ele parla "Questi erano miscelati ad acqua pulita, tappati e custoditi in una cassettina."
        ele punta "Ma attenzione! Il colore pronto non si conservava a lungo, quindi bisognava sbrigarsi ad usarlo."
        ele sorride "Bene, i colori sono pronti. Ora bisogna usarli..."

        leo punta "Prendi i pennelli, così ti spiego alcune cose su questi strumenti."
        
        show bg pennelli
        with dissolve 

        leo sorpreso "Nel medioevo la tecnica di produzione dei pennelli evolve notevolmente."
        leo parla "Le Penne e i peli di animali che li costituivano, erano modellati per ottenere una cima a punta che veniva legata a un bastoncino di legno."
        
        ele domanda "I pennelli però potevano essere solo a punta tonda? "

        leo punta "Per avere i pennelli a sezione piatta, dobbiamo attendere l'epoca industriale."
        leo domanda "Prima abbiamo parlato del brunitoio per lucidare l'oro. Che ne dici di dire qualche parola in più su questo strumento?"

        ele parla "Volentieri!"

        show bg brunitoio
        with dissolve 
        
        ele "Il brunitoio era costituito da un'asta di legno a cui veniva attaccata una pietra dura pregiata come l'agata. "
        ele sorride "Ovviamente il brunitoio più economico era quello in osso, detto anche povero."
        ele punta "Ed ora vi voglio parlare del punzone!"

        leo sorpreso "Il tocco “meraviglioso” nelle pitture medievali!"

        show bg punzone
        with dissolve 

        ele sorpresa "Il tocco finale e il più raffinato della doratura, era rappresentato dalla Punzonatura."
        ele punta "Il punzone era uno strumento metallico con l'estremità incisa."
        ele parla "Con il Punzone si imprimevano quei motivi che ornavano le aureole di Santi, le vesti e i cieli stellati."
        ele sorpresa "Questo creava un effetto di grande impatto visivo."


        ## End of this section 
        jump backtocontentmenu

    #########################################
    ## SECTION: La doratura  ##########
    #########################################

    label doratura:

        show bg bottega

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "L'oro tutto impreziosiva!"   


        show bg bottega

        show leonardo onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena ascolta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        ele "Era molto scenografico e, dato il suo valore, aveva anche un significato preciso!" 

        show bg doro
        with dissolve   

        hide elena onlayer leftmostcharacter
        hide leonardo onlayer rightmostcharacter

        leo domanda "Tutto chiaro, ma come facevano a produrre la foglia d'oro?"

        ele parla "Ora te lo spiego!"


        show bg battirolo
        with dissolve

        ele parla "Per trasformare l'oro in una lamina sottile, c'era bisogno di pazienza, forza e maestria."
        ele sorride  "Chi aveva queste doti, aveva un lavoro certo: quello del Battiloro, artigiano specializzato nella creazione delle foglie d'oro."  
        ele "Il lavoro consisteva nel battere una pepita d'oro tra due pelli di animale, con un enorme martello fino a ridurla a una lamina sottile."            
        ele punta "Ma non era finita qui."
        leo domanda "Quindi, cosa avveniva dopo?"

        show bg bolo
        with dissolve 

        ele parla "Si preparava il bolo, un'argilla che contiene ossido di ferro e conferisce un colore rosso."
        ele punta  "Addizio*nata alla chiara d'uovo, preparava la tavola o la tela all'applicazione della foglia d'oro."

        leo sorpreso "Il colore rosso, che si intravedeva sul fondo, conferiva \“calore”\ all'oro creando effetti chiaroscurali suggestivi!"
        leo punta "Siamo arrivati al momento clou! L'applicazione della delicatissima foglia al supporto!"

        ele domanda "Qual è la caratteristica più importante di questa fase?"

        show bg foglia
        with dissolve 

        leo punta "Mano ferma e grande accortezza! Erano i requisiti fondamentali per applicare le lamine d'oro!"

        ele parla "L'artigiano usava un coltello da doratore per applicare la foglia al supporto."

        leo parla "Poi con un pennello procedeva al tamponamento del pezzo per far aderire bene il tutto."

        ele domanda "Finito così?"

        leo punta "Assolutamente no! Siamo arrivati alla fase della levigatura!"

        ele domanda "Cioè?"

        show bg levigatura
        with dissolve

        leo parla "Ora che la foglia era applicata, bisognava brunire, cioè lucidare l'oro."
        leo punta "Per farlo si usava il brunitoio - fatto con osso o pietra d'agata – e si strofinava la superficie finché non diventava lucida."

        ele sorpresa "ora arriva la parte che preferisco!"

        leo domanda "Quale?"

        ele segreto "La punzonatura! Te la spiego:"


        show bg finitura:
            subpixel True ypos 1.0 zoom 1.0 



        ele parla "Il punzone era uno strumento che imprimeva un segno o una forma sulla superficie, impreziosendo il tutto."
        ele "Con la punzonatura si creavano effetti materici e tridimensionali. Si decoravano le aureole dei Santi, gli sfondi e si rifinavano i piccoli dettagli."
        
        leo sorpreso "Ah che meraviglia!"

        ele sorpresa "Davvero strepitoso. E così siamo giunti all'ultimo step. La velatura!"

        show bg velatura:
            subpixel True pos (0.54, 1.53) zoom 2.26 
        with dissolve 

        ele parla "La velatura era la pennellata  di uno strato di colore finale, sul lavoro fatto."

        leo parla "Veniva applicata per spegnere un po'l'effetto lucido della brunitura e proteggere la doratura dal deterioramento."

        ele sorride "Il nostro viaggio nel mondo della doratura è giunto al termine!"





        ## End of this section 
        jump backtocontentmenu

    #########################################
    ## Brings back to content menu ##########
    #########################################

    label backtocontentmenu:

        scene bg bottega with dissolve

        show leonardo ascolta onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        jump content

    ############################################
    ## SECTION: Greetings ######################
    ############################################

    label congedo:

        show leonardo saluta onlayer rightmostcharacter:
            xpos leonardo_xpos ypos leonardo_ypos zoom leonardo_zoom

        show elena saluta onlayer leftmostcharacter:
            xpos elena_xpos ypos elena_ypos zoom elena_zoom

        leo "Grazie per aver visitato la Bottega del Dipintore!"

        ele "Arrivederci a presto!"

        return

