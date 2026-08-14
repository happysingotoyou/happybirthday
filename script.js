/* =========================================================
   BOOK / DIARY SCRIPT
   =========================================================
   Rewritten to keep the existing functionality while making
   the navigation and dynamic page generation consistent.

   IMPORTANT:
   Keep your existing countdownDays array in the marked
   section below.
   ========================================================= */


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const intro = document.getElementById("intro");
const continueButton = document.getElementById("continueButton");

const page = document.getElementById("page");

const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");

const chapterMenuButton =
    document.getElementById("chapterMenuButton");

const chapterMenu =
    document.getElementById("chapterMenu");

const chapterOptions =
    document.querySelectorAll(".chapterOption");

const heartsContainer =
    document.getElementById("hearts");

const darkHeartsContainer =
    document.getElementById("darkHearts");

const countdownInsertionPoint =
    document.getElementById("countdownInsertionPoint");


/* =========================================================
   SAFETY / DOM CHECK
   ========================================================= */

if (!page) {
    console.error("Book page element #page was not found.");
}


/* =========================================================
   CHAPTER DATA
   =========================================================
   
   Chapter 5 is built dynamically because it contains the
   countdown entries.

   Chapter 6 is intentionally only ONE page.
   ========================================================= */
const chapters = [
    {
        name: "Introduction",
        spreads: [0, 1]
    },

    {
        name: "Us",
        spreads: [2, 3]
    },

    {
        name: "Them",
        spreads: [4, 5]
    },

    {
        name: "Beauty",
        spreads: [6, 7]
    },

    {
        name: "Countdown",
        spreads: []
    },

    {
        name: "Conclusion",
        spreads: []
    }
];

/* =========================================================
   COUNTDOWN DATA
   =========================================================
   
   PASTE YOUR EXISTING countdownDays ARRAY HERE.

   Example format:

   const countdownDays = [
       { day: 100, text: "..." },
       { day: 99, text: "..." },
       ...
       { day: 1, text: "..." }
   ];

   Do not change the data itself.
   ========================================================= */

// PASTE YOUR EXISTING countdownDays ARRAY HERE.

   const countdownDays = [
    { day: 100, text: "100 days remaining til your birthday: Not much to say for today apart from the fact it’s officially only 100 days left til you’re birthday honeyyyy !!!! I know you’ll probably read these when I’m done like YEHA DUH HELP THAGS TBE ENTIRE POINT im ITSOKA LIEK I love youuu honeyyy!!! The entire point is liek itsoka for these 100 days I just write something youuuu related counting up til your birthday and then this will be one of the present/gifts you get get on said day !! Not much I can do digitally I help but itsoka liek yeha!! Iloveoyouuu" },

    { day: 99, text: "not much for todayyy I woke up prettyyy late oopsss but heyyy liek we talked plenty for the entire time yoh were awake til the second you sleptttt, and I got to be plenty flirty you with my beautiful wife 🤭 I love you ssosososoososmuchhh ohh and then you woke up for your medicine like you always do you’re soooo cute I love youuu ilove talking youuuuiserioislyloveyousomuchyouresocutrandprrttyyyy eeksksk" },

    { day: 98, text: "isoslepy iforgottowritein midleeof day ilovryou f dee diohpryourexamgoe welel f" },

    { day: 97, text: "97: honestly i have no set time for these.. journals? diaries? logs?? documentary?? I have no clue what to call these, and neither do i have a set time HELP I just wing it i i I help itsoka i love youuu!! YOU JUSY SLEPTTT EEKSKSSS MYYY SLEEPYY BEAUTYYY how i love texting my sleepy princess 🤭  i miss youuuu my wife !!" },

    { day: 96, text: "96: zzisoslept zziloveuiu" },

    { day: 95, text: "95: oopssss GELP J WAS SO SLEEPY YESTERSAYYY EEKSKSK ITSOKA LIEK TODAYY what do you mean you wanna get pinned down by meee 🤭 EEKSKSK ILOVEYOUIU SOSOOSMUCHHH What do you mean you daydreamed about pinning me down and me pinning you down by bro wh😵‍💫 😵‍💫 you’re so cute bye ILOVEYOUSOMUCHHH EEKSKSKSNSHDJJD ILOVE YOUUU MYYY NABIIII you called me darling so much in the morning I think i died😵‍💫" },

    { day: 94, text: "94: what does the miniso thing mean bro I NEED TJISS; ITSOKA THAY WAS EALIRERRR NOW I KNOW EHAT IT MEANS HELP ohh also like the ; is supposed to symbolize a time skip or something itsoka yeha we make the rules as we go HELP cause im probably not gonna use proper punctuation so THISSS is when like WHEN YOU SLEPTTT you slept I love touuu ESKSKS you just said you’d frenchkissmeitdokaveryhappy😁 😁 😁 iloveyousomuch iloveyouilovryouESKSKSK ILOVEYOUU I SPENT SO MUCJ TIME WIRJ TOUU TODAYYY ILOVDYOUU AAA" },

    { day: 93, text: "93: Irsoka liek im writing this in the car so it’s technicallyyyy 92 but liek heyyy liek liek itsoka 93 like I LOVE YOUUU HONEYYY EEKSKSK YOU LOOKED SOOO PRETTY TODAYYY OH MY HODDD I CANTTT STOP GOING INTO MY GALLERY MID CAR RIDE AND JUST LOOKING AT MY BEAUTIFUL PRINCESS 🤭  GOSH SHES SO PRETTY AAAA I wanna kiss her and attain all her make up on meeee 🤭 🤭 ILOVEYOUU EEKSKSKS SOSOSOMUCHHH THANK YOU FOR THE SNAPS SOMUCHH AAA I APPREIDTAE IT SO KUCH🥺 YIU GET EXCITED AND LOOK FORWARD TO DRESS JUST TO SJOW ME NOW TOOO 🤭 🤭 🤭 ITS SO CITEE AA EEEKSKDJKSDJS ILVOEYOUOOVRYOUILOVRYOUUU I LOVE YOUUU NABIHAAA EEKSKS" },

    { day: 92, text: "92: stillnotoverthosedressesbroiekejekdnKSJDKS OHMYGODD YURESOSPPRETTY BUEIJU ST WANNA GOKD YOUR ARM AAA EKSKSBSKND AYOURE SOOOSCUTEE YOU HUDT FELL ASLEEP EKEKSBDKSNS I MISSYOUSOSMUCH HONEYY YOURE MY BRLOVED WIFEE EKSKSKS" },

    { day: 91, text: "91: almost 90!!! EKSKSKS YOU JUST FELL ASLEEPKWDNKSJD YOURE SOOO CUTEEE I wonder if you noticed i was saying nabiha a lot on purpose after every sentence even if it ruined the flow 🤭🤭🤭 loveyourname!! YOUS TIDIED SOO MUCHH TODAYY MY HARD WORKING PRONCESS WHOM I LOVEELSKDKSD iwannakissyiu… sopretty IBALSO GOT SO MANG SNALSSS TODAYY OHMYGODD YOU LLOK BEATIFIUL IN RED EYE SHADOWBSKDBSKDJS 😵‍💫 yehajdhsjshilovemyeife" },

    { day: 90, text: "90: OMGOGMG 90 DAYS ELFTTT EEKEKSKSK ITSOKA IK WTITING RHIS AT LIEK 11:50 YOU SLEPTTT A WHOLEEE AGOO BUT EEKKSS IM SO PROUD OF YOUU TODAYY YOUR P4 WENT WELLL HOJEYYY I LOVEEE YOUUU EEKSKSK GOGG AND WE HAD SOMANY CUTE CONVOS TODAYYY EEKSKKS andliek iloveyiu somuch iloveuou ANDLEEKEKS your random sentimentality in the day was sosossososo fricking cute🥺 🥺 EKSKSKS 90 DAYS LEFTTT I CANT WAITT🤭 🤭" },

    { day: 89, text: "89: officially less than 90 days left !!! 🤭 EKSKSKS i got a liiillll emotionallyyyy oopsssi hopeyousidjtmind !! IMMIM YOU PROMISED YOUREE NOT SORRY IJ ANYWAY IR FORK BUTLIEKEK STOLL YONOWW LIKEEE I IUST HOPE YOU DIDJT KIND IN ANY WAU OR FORM BABE ILOVR YOU SOSOSOMUCH EKEKDKSDJS TJANK YOU FOR SUPPORTING ME TJANK YOI FOR EVERYTHING IWISH I GOT TELL YOU THAJO YOU PVER A MILLION TOKEStjankyiu 😢 😢 ilobeyiu SOOO MUCHHH MY BEAUTYYY you’re so pretty you’re so BEATIFUL I DIDNT get to appreciate your snaps enough you’re so beautiful 😢 😢 i love you baby i love you honey somuch AND OHMYGODDD EKEKS IT WAS RANIAS BORTHDAY IM SO HAPPY FORYOUUU EKSKSK IM SO JAPPY YOU GOT SEND A PARAA AND YOUR STORIES AND EVERUTJIJG I HOPR YOU EMJOTED AND I HOPE YIU HANGOUTWIRJHER ADND TIFF ITSOKA i love you !! I wrote this one liek you would read this in the morning im i liek i oopssss but i love you babe !!! Whenever that is you read this 🤔  i liek I presume it would be the day ADTER your birthday and i am hypothetically sleeping liek or liek ohhh id probably be out of city on a pakistan tour so liek god knows HELP I LOVE YOUUUU" },

    { day: 88, text: "88: helpimsoslept itsoka you slept all flustered today NONETJELESS WITH AN IPADDD HRO WHAHDJASHSJ iloveotiu 🤭 🤭 iloveyouubbabyyy!!" },

    { day: 87, text: "87-80: OOPS I honestly forgot this existed think got distracted by my flight and all and I’ve been exhaursted a little ooppsssssssssshelpITSOKA BSCK ON TRACK NOW HIHIIII I LOVE YOUU BABYYYY ITSOKA OH MY HODDD 80 DYASS LEFTT OFFICIALLY EKEKSKS ohhh liek i itsoka TO GONOVER STUFFFFF LIEK I MOVED COUNTRTITESS WOAHHH AND EID CAME WOAHHH AND MY WIFEEEE LOOKED SO ABSOLUTELY BEATIFIUL ON EIDDD AAA IL OVR HERR SEHES SOSOSOOSOSOS BEAUTOFULLL AND TODAYYY IN PARTOCULAR SHE WAS A LITTLE APOLOGETIC AT NUGHTT ohmygodiloveher she stayed up so late to talk to me 🥺 ILOVEHERRR EEKKSKSS FOR REFEFNCE IM WRITING THIS ON 4 AM ON THE 29TJ DO TECUNICALLY TODAY COUNTS AS BOTH 28-29 BUT THIS RNTIRE THING IS SUPPOSED TO EB A SIMMARU OF THE LAST 8 DAYS ITSOKA LIEK WE DID SOOO MUCHHH EEKSKSK ILOVEYOUSOMUCHHBABYYY YYOEUDKHDJ youresoprettybro EKEKSSYEHA ITSOKA ILLBE MORE CONSISTENT FROM NOW ON… i love youu!!" },

    { day: 79, text: "79: ITSOKA IT JUSTTT HIT 12 LIEK YOURE IN THE DTOREEE RIGJT NOWWW AT DOLLMENN AND LIEKEEKEKS I KISSYOUSOSOSJCHHCMUH ohgggg yeha i wanakissyiu BUT I MISSSYOUUUDOSOSOSOSOMUCHH MY LOVEE EKEKSS ILOVFE YOUU I HORL ALL IS WELL AT DOLLMENNN" },

    { day: 78, text: "78: OKAAOKAA ITSOKAYOU JUSTSLEPTT EKEKESKYOU STYUDEWDID SOMCUH TODAY IM SIRPOOUD OF YOUUUU ILVEOYUNABIIII EKESKYOU WERE SO ADORABLE TODAYY IOLKVEOIYOUYUUU IYDOKS igoslep now ithinkn or liek do woirk i IMISIOYUUUUUUU SOSOSOMUCHH MY PRINCESSSSS" },

    { day: 77, text: "77: HELOOIJUST WOKE UP AFTER MY NAP OM TALKING TO YOU RIGJR NOW IRSOKALIEK ILOVEYOUUUSOSOSOMUCHHH BABEEEEE KEDKSJSS YOURE SO ADORBALEEEEEEE abeyiu did things related to meee 🤭 🤭 so excited to see what my obsessive baby has been doing for me soon !! Loveyouuuu!!" },

    { day: 76, text: "77: EKEKSLEIEKEKE ITSOKA IPOBEYOUUU SOSOSOOSSMUCHHHHWEMATFHED ON THEEADS WEARMATHCED ON SO MANY CITW THINGS BRO EEKSKSKS ILOVEUOUUUUNSOSOSOSMUCHHH" },

    { day: 75, text: "76: ogggsringo got a littleemotionalooopsssIlobeuouuuILOVEYOUOSSMIVJHUHEKEKSKNMYYYNNABIIIIBEKEKSKNIMISSUOUUU WE MARCHED ON WHATSAPP TOOOOBEEKSKS IMGONNA khhgggg applenab got a little emotional too how I love comofrtijgyiuohjfhskdjejjilovyouyoskuch IMISSYOUUUSOSOSOKUCHHH" },

    { day: 74, text: "77: EKSKSKS WE MATCHEDON INSTA IMGONNADIE thankyourajnoyoyutajnyoyoutuankyouthantoyiioweyoueverutnijg bro even though you didn’t wanan you still did todayimgonamcry i love you so much 🥺 🥺 Ohhh YOU ALAO STIDIED TODAY IM SOVPROUD OF YOUUU AND I I I oops I took a nap til 1 am oopsHELP I LOVEYOUUBAVYYY" },

    { day: 73, text: "76: ohmygodbyebroiwas still looking at the insta pfps rightnow… EKSKSTHEYRE SO CITEE AAA ILOVRYOUII UEPLP YOU TOLD RANIA TODAY WE’RE A TJING… which liek woah that’s still crazy to me bro wh whatdoyoumean im taken.. and the by prettiest most gorgeous girl nonetheless 🤭 godiloveherilovemywife EKSKS ILOVEYOIUU EKDJSKJD ICANT BELEIVYUYOLD HER BRO IM GIGGLI NG SOMUCHHH AAA EKEKSKSK. I wonder if I’m approved or not I I I I yourenappigngwrigjtnow HELP OOPS WE DIDNT DISCUSS IT PROPERLY YET… I hope your nap is plenty my beauty !! 🤭 IPOVEYOUUU!1!1! Ohmygod youresobeaitoful I got to seeyouunyourubiform again.. she sopretyyyyy😵‍💫 OHH ANDRODAY WAS YOUR PHYSICS P1..!!1!1 IG WENT GOOD I THINK ITSOKA IM SO PROID OF YOU.. ILOVEYOUUU 😁 😁" },

    { day: 72, text: "75: ITSOKA LIEK RIGJT NOWWW YOURE EATINGGG WHILE FILLING A FORMMM AND LIEK YOURE YEHA YOU ALSO DID SOKETJING RELATED TO ME RIGHT NOW WWOAHHHH iloveyousomuchyourdsocuteiwannagivryoutheworldmybabyyouresocuteiloveyou oggg ANS YOUR PERUODS ATILL NOT JERE BRO WHERE IS IT KILL EVERHONE WTAFFF EKEKSS IMGONNAKILLTJEMALLNyoure so strong my baby nlove you 🥺 🥺 ohhh my misss don't leave me alone 🤭 🤭" },

    { day: 71, text: "74-72: Wh hapened whWHERE DID RHE DAYS GO BYE OOPS ITSOKA WHIKEIN WEIRING TJISSS LIEK ong bro you were sooo flirty in the morning and then LIEK ooopsss lover took you 🤭 EKSKSKSK ITSOKA I GOTTA LET ME WIFEEE KNOWWW IM THE ONE WHO WEWRS THE OANTSS !1!1! IRSOKA EKEKSSK YOURE SO SWEET BRO SYAYIJG UO FOR ME WHILE IK NOT JOME 😢 😢 🥺 🥺 🥺 iloveyousomuchiwannamarryiuOHHH ALSO YOURE SO BEAITOFUL AAA EKEKSKSK NOT OVER TJE HREEN CLOTJES SJAPPPP" },

    { day: 70, text: "71: YouresocutebyeEKSKS YOU STUDIEDD ALOTT TODAYY AND I ARE ALOT YEHA TISOAK and your messages with RANIA wowwww 🤭 🤭  you’re so cute nabi i truly love you so much, you’re my everything I love you babe 😢 😢 KEJDKSDJ I GO SLEEP JOWWW why am I telling you here helpBUTITSOKAILOVEYOUUimgoingtocry imgenkunelyintewtsicantevermwkeituptoyyoubrowyafyhteraniamessges😢 😢 ohhhhand your periods first day i" },

    { day: 69, text: "70: I just realized LIEK half the days truly don’t represent themselves cause OOPS I MAKE TJEM PAST 12 SO LIEK A DAY IS TECHNCIALLY IS SJORT OF ITSELF I DJNJO HITSOKA LIEK HELP you just went to study !’ IMISSYOUUU ITS EWELY MORNING OMKDJDKSJS I LOVEYOUSOMUCH Im very sentimental over you HELPEKEKSKILVOEYOUUU YOURE SO PRETTY BYEIVE JUST BEEN LOOKING AT YOUR SNAPS😭 👋 👋 👋 itsokailoveyou" },

    { day: 68, text: "69: OKAAA HELP ITS YOUR SISTERS BIRTHDAY RODAY but she can go die idont care about her help EKSKSKS TODAYSSS LIKE YOUR LASTEXAM TOO OKYNTGDDD my girl worked so hard Imm so proud of her it’s finally gonna be over 😢 😢 iloveyousomuchyoustillgavenesomuch attention and time even during your CAIES that’s crazy to me I couldn’t ever ask for anything else I love you so much tjankyou 🥺 🥺 wkjdskjd HOURESOOOSTRONG TOO SECOND DAY OR YOIR PERIOD🥹 IOLOVEYOUUU" },

    { day: 67, text: "68: EKSKSKSSOSOSJAIJD YOU JUST SLWPTTT I TBINK you’re so cute bro Ohmyogd you slept so suddenly i bloeyousocmuch you’re so cute my baby i love you i wanna baby you i wanna have you on my lap as i play with you and caress you to sleeEKSKSK YOH DID SOO MUCH RIDAYYY YOU GAVE YOUR DINALL EXAMMM YOU MET UO WITH RANIA AFTERWARDS AND ATEEE THEN WWNT OUT TO YOUR SISTWRS THINGYYY AND ATE THERE TOO AND TOUSJDJSJSJ YOURE SO STEONBGGG BEOO AND 3RD DAY OF YOUR PERIODSDD ESKKSKSNY WIFE IS SO STROJG SHES A WARRIOR i love my wife AKDJKSSK IKVOEYOUU and BY GODDDD BROO YOU KOOKED INCREDIBLE TODAYYY DJABDJSJDJ some of my favorite snaps itsoka iuntgod your nails your face your SKINNN YOUR AAA EVERYRHINGGG jowareyoumine😵‍💫  sleep well my princess, no wonder you slept so suddenly you’re tired and did so much 🤭" },

    { day: 66, text: "67: EKSK 4TH DAY OF TOUR0ERI9D OMGOGKT YOURE SOO CUTEE AAA omg you asked to vc tomorrow I love yo7 iloveyou ioobeyo7ov9duo7o9veuou iLOVEYOUUU IOOVRYO78UI imtyp8ng on the infijixhelpTHEKYBAOEDS SONWEIED INDONT LIKENRTPING ON TJIS omgyouweresocuterodayilloveyiu SOOMUCHHH MY BABYYY AA EKEKS ohhyiu GO OUT TOMORROW TO TJE MOVIES I TJINK... IXANTQAIT TO ASKNYOUNTOKORR9W ALL ABOUT ITTT ohhh and help another incident happened today with your towel BYE omgyoures9cute I love making you flustered !! Iloveyou I M8SSUOUUS9S9S9KUCHY SLEEPWELL MY PRINCESSS you were really apologetic again at nnight today omg I wish I could tell yo7 just how much I love you and howntheres no need to be like that but SKJCJSJS YOURESOOOVADORABLE BRO I love your apologeticness I love everybitoifit irsokayoureso ASORABLEEEE SLEEPWELL BABYYY" },

    { day: 65, text: "66: EKSKSK you just slept I love you so much 🥺 ITSOKA OMGGG OJR FIRSTTTTTT VCCC BACKKK AAA KEKEKSS we took an iq test and then toh had to go out with sneha itsoka.. HELPAWIIWWI IHOPEYOU HAD FUNN YOU AGE 4 pizza SLICES BRO IMSOHAPPYMYWIFE ATTEEE and YOU ALSO LIKE TALKED TO RANIA EARLIER ITSOKA ohh 5th day of your period itsokailoveyouEKEKS OAND AWWIIE YOU HED SUCH A CHTEE SENTIMENTAL LATE NIGHT MOMENTT ILVOEHOUUU" },

    { day: 64, text: "65: EKSKS BABYY ILOVEYOUUU TOUUUST SLEPTTT again i at 6 am i i itsoka ILVOEYIUSOMUCHHHEKSKS IT WAS DAY 7 OF YOUR PERIODi was wrong by a day help ithink SOLIEKAAA ILVOEUOUUU ESKSKSK oggg WE VCD AGAIN TODAY AND got scammed by an iq test YEHA i think that was the real iq test bro i i ILOVEUOUUUU EKSKSKS i go sleep it’s 6 amHELP ILOVEUIUU MY BABYYY" },

    { day: 63, text: "64: ITSOKA VERY day YEHAA MANFLE AND FOXY BS JS STILL GLING KN BRO BUE and lidk its day 8 of your period NOW HELOICANR AND HELO BYE BRO DKILL THEM ALL we coukdnt vc todayyy... I wanted to ask but I knew it'd be difficult for you causs like yeha ifs liek foxy in drawing room and mangle and shart YEHA irsoka IDIDNT ILIVEUOUUUBSSOONHCHH ITSOKA THEN LIEK omg you slept early today I'm so happy I love touilovehouilovttouiwannakisshou oggg I wonder if you truly read all of this can you tell me squaggleduck if you did!! Ysha ifsokawiloveuou ilvieyouSKSKKS ILVORYOUUU oggg you woke up again at liek 3:30 HSLO IFSOKA YOU SLEPT AHAINNN iloveyou igoprayfajrnowandgoslep💗" },

    { day: 62, text: "63: you ARE SOO ADORBALEE AA WEKSKKSKS itsoka you did ALONTOTODAYYY appanrnryu YOU GOT SOMETNING FOR ME BRO WGAD IMGONNA DIEE AAKEKSKS YOU FOMFORTD ME IN TJE EVENTING AND STAYE DTJWRE FOR ME until snehas dad came helpAND LIEK oggg YOU GOT SOOO FLISTERED AT NIGJTTT 🤭 🤭 my flustered princess how i love jerrrMABSKSJDJS youreoscute yes im gonna kiss your breasts bro…" },

    { day: 61, text: "62: YOUHAD YOURRR JIXORRR TJINGYYY MEET N GREET IDUNKO HELPITSOKA YOU MADE friejds othinkn AND YOULOVED TJE DEANNN AWIEIESYOIRESOOCTURUTEE EKSKS I LOVEYOUUSOSOOSMUCHHHHH IMISSUIUSOOOMUCHJJ IHOPEITSLALGOONGWLELEJKDKD YOURE SONSTRONG ITSOKA ICANTWAITTOTLALTOYOUIU😁" },

    { day: 60, text: "61: IRSOKA EHELPEKEKDNDK TODAYYY I WENT OUT FOR LIEK half the day help BYEBLOPPS ICANT ITSOKA I HAD SOO MUCH FUNNN i didn’t have a chance to tell you about today oops you got sleepy and were in bed and i felt bad making you stay awake any longer and liek now you’re asleep and now I PROBBALY won’t ever get a chance to explain this i think we’ll just gloss over it and i feel bad making it about meeventjougjiknowyouwontmindbutidoitsokaLIEK IF YOU ASLKK ILL TELL YOUUU SOSOSOKUCHHH but you didn’t oops im LIKEILL ONLY TELL sosososomuchhelpiwannatellyouall BUT I CANT CAUSE YEHA IFSOMA ILLWAITOFRYOITOASKEUTSOKA RHEN LIKEoops you were so hungry i hope my baby eats 🥺 KSJDKSJS IHTEVERYTHING BRO KILL THEM ALL Itsok ANS THDN LIKE YEHA ITSOKA TOU SLEPTTT YOJ WERE SOOCUTREEEE im never leaving you baby, ever i love you 🥺 💗 YEHAITOSKA I GOSLEP NOWW" },

    { day: 59, text: "60: OFFIAlly 60 DAYSSS OHMTGODDD EKDSKDJKSJD EKSKS omg yourssocutewEKKS TODAYY LIKE you were so hungry yesterday you woke up feeling so hungry today I Wana feed you my poor baby😢 😢 sjdjksjdj AND LIEK I WAS OUT MAJORITY OF TJE DAY TODAYY BECAUSE of clothes i think I ii I I oopsBUTYOU SCCOMPANIED THELUGH IT ALLLWDKSKKS YOU WERE WSVHING YOUR SJOWS INT SHRONING SND TJEM LIEK YOU WANTED TO READ YOUR BOOK THINGY LIKE YOU WERE LOOKING FOR A BOOK NAMED TJE BOYFRIEND OF SOMETHING ITSOMA I HOPE WHENEVER YOU READ IT YOU ENJOY IT MY LOVEEE EKSKS AND TJEN YOU FELL ASLEEP MID CONVO 🥺 🥺 ilvoeyougouresocuteYOUWEREONLINETHRNETIREFIKENDKSJD YOU GELL ASLEEP IN CHAY🥺 🥺 sleep well my princess" },

    { day: 58, text: "59: WE VCS FOR SOO LONGG TODAYY EKSKSKI LOVE SPENIDNG TIME WITHYOUUUU NABIII IVOLVOYOUSOSODMHCHHH Oggg OHYMGOGDOD BRO LIEK WE kinda DECIDED ON A MEET UP TJINGY ITSOKA TUESDAY... IT WAS WEDNESDAY BEFORE GOU SSKED FOXY AND TNDN SHE WAS LIEK NOO.. Tuesday I I OKA.. HELO EKSKSIMOSSYOUUUU YOU SLEPTTG YOURESOOCUTEE IMSISYOUSOSOSKUCHH NY LOVEEEEE EKKSKSS 🥹 💗 💗" },

    { day: 57, text: "58: isoslepthelpITSOKA WE VCD AT NIGJTTT AND EARLIER TODAY O WAS OIT AND YOUWERE TBERE FOR ME ILOVEUOUUU AND WE VCD AND FONALLT DOD LIEK 50% OF DELTARINE CJAPTER 1 WOAHHH I I I I yehairsoka we got that OHGG ANDDD YOU ALSO SAID OTS LEGAL TO KISSYOUON TJE LIPS AND FNAH YOU WAMT THAT 🤭 😁 😁 SLSKSSOOUCHHCIGSSS ILOVEUOUUU igoslepnow" },

    { day: 56, text: "57: EKDJKSDJIMISSYOUU YOU SLEPTTT WND LIEK ooppsss Sringo got a little emotional IRSOKA THEN YOU GOT EMOTIONAL ILVOR YOU ILOVE COMFORTING AND CONSOLIMG YOU BABYYY 🥺 🥺 no matter how bad it is I always know we’ll end on a satisfactory conclusion and we both take back our sorries always ilovehouforthatthankyou 🥺 🥺 🥺 AND LIEK ITOSKA WE VCD FOR AN HOURRR AND THE PLAN IS FILLY CONFIFKED NOW YEHA ITSOMA I ASKEDD AND TOU LAREADY CONFIDMED IT ELEKSKS I CANT WAIT TO MERY YOUUU 😁 😁 😁 🤭 🤭" },

    { day: 55, text: "56: imsosleptjelpBUT OHMYGOD I MEERY YOU SOON I SKDJKSJDKSJS IMSOEXCITEDEKSKSHELPP AND LIKE WE VCDFOR A BITTORDYAYYEKEKKSSKILOBEUOUSOSSUCUSOCJAKJSKSJSNISSUOUUU MYY BABYY" },

    { day: 54, text: "55: oh my god you’re soooo pretty sooo beautiful my majestic gorgeous wife, how i loved meeting you, how I loved being in your presence with just us two, how I enjoyed eating with you, carrying your things for you, being there for you, seeing you smile making you smile, seeing your majestic smile and makeup, seeing just all and doing all with you just spoke volumes to my heart in a way nothing else has ever even hoped to achieving to do so, I love you, Nabiha Suhail, oh so profoundly I love you, baby. I love you. Everything about you speaks a million languages yet one answer to me, your words your personality your looks your voice your body your face your manners your “flaws” your everything, I love it. I love you, every second I enjoyed, I truly promise you there wasn’t a singular second I felt as if I wasn’t enjoying, being with you was one of the if not the most enjoyable experience in my entire 16 years of living, this was the best meet up ever for me personally, I love you. Sweet dreams my bride. 🤭 💗" },

    { day: 53, text: "54: omgbro im not over yesterday you looked so pretty 🥺 😵‍💫 😵‍💫 😵‍💫 sjdhksjdjsILOVEYOUUUUSODJSKDJSJDJJSBDJSBD ILVIEYIUSOSMUCH IFSOKA LIEK TODAY DELTARUNE RELEASED FIRSOKA AND THEN LIEK YOU SLEPTTT SO TBENLIEK YOUSLEPTINCALL AGAINNN and weplayddandvcdddojrobloxx ayehaaa myfirsttimeplaying as a taken mannnontobloxef💗 iloveyi f💗" },

    { day: 52, text: "53: isoslepthelpoopssieorgottowritebutliek youfellasleepeppepincall againnn and weplayddandvcdddojrobloxx ayehaaa myfirsttimeplaying as a taken mannnontobloxef💗 iloveyi f💗" },

    { day: 51, text: "52: ELSKSKS YOU JUST FELL ASLEEPP MYYYY BABYYYSKDJSJJDJS YOUREOSOSOSCUTEE WE VCD ABAIJNNFOR A SJORT BIT AND NOW I CAN SLEPE EERLY CAUSE THEHRE ASLEEP EKEKS I KISSUOUUUSOOSSKUCH oggg yeha. I wanna kiss you HELP ITSOKA WE TALKED LIKE FOR HOURS ABOUT LISSING AND HUGING EACHOTJER AND ALL THAG TYPE OF SJART ITSOKA omg I ove you so much ilovryoulrgsmakeout KSJDISJSJS YOU JUST SLEPTTT NOWWW AND KM GOING TO BEDDD GOODNIGHTTT MYYY BABYYY MY PRINCESS MY WIFEE ELSKSK Igoslepnow💗" },

    { day: 50, text: "51: ALMOST 50 DAYSSS EKSKDJSKDJDJ OHMYGODDD ILIVEUOUUU ifsoka today liek at 6-5 am you had a nightmare and I comforted you, I loved comforting and consoling you so much i loved being there i loved all of it, I love you 🥺 💗 and then LIEK WE JUST YEHA I WAS OUT AND IN THE MORNING HOU HAD YOUR NIXOR STUFF AND ALAY ITSOKA AND THEN YOU JUST SLEPT NOWWW IM TYPING THIS WHIKE IN THEIR HOUSE EKSKSKS IMISSYOUSOSOSOMUCHHH ilvoegakkingtoyou ANS OH MY HODDD YOU WENY YO SNEHAS HUSE AND YOORFOOWW YOU’LL TELL ME STUFF IM SO EXCIGED AND LIEKLIEK ihooryoudontforget I HELO LIEK AND LIKE LHMYGODD yshailiveuou Oggg YOU LOOKED SO PRETTY TOFAY BYE WTAF SKDHJSDJ EBEN WHILE IN. A BLANKET AND STUFF YUR MAKEUP WAS AMAZING TODAY😵‍💫 😵‍💫 ilvieyiu💗" },

    { day: 49, text: "50: 50 days officially left my love EKDJKSJDS YOUSLEPT ESLRY TODAYYY AND SO WOLL III ILLGOSLEEP AFTER WITTING THIS EKEKS YOU JUST SLEPTTT ITSOMA TODAYY LIEK you applied and researched for universities AND STUFF ACAUSE I woke up very late ooppssssITSOKA THEN LIEK WEYOU TOLD ME ABOUT THE SNEHA SHART AND WOWAHAHH AND THEN MY MRS ASKED ME TO DSNCE WITH HER RKEJEHSHDHSHSSH 🤭 🤭 omgimgkmna cry you’re so cute you you you said you’re the safest with me before sleeping I love you😢 KSDJKSJD SLEEP WLEL MY LOVEEE officially 50 days left🥹 🥹 HALFF !! KEHSSHGSHSHS ILOVEYOUUU I need to get to work i iIRSOKA ILVORYOUUU IGOSLEEPNOWW💗 💗 💗" },

    { day: 48, text: "49: oopsss I WOKE UO REALLYYY LATE AGAINNN BUT LIKR TOFAY I HAD TO GO TO THE MEHDNI AND YEHA NTO very productive day very less nabiha today… I missed my wife😢 😢 howbadlyiwantedyoutotalktooooWKDJSKKS ITSOKA BUT I CAME HOMEEE AND WE TALKED ABOUT period and straws yeha i AND TBEN YOU SLEPTTT EKDKSKA AND NOW I GO SLEEP TOO ITSOKA ZZZZ yehabye I loveyouuuuSKSKSKS GOODNIGJTT ILVORYOUU I GONSLEP NOW💗 💗" },

    { day: 47, text: "48: woah very eventful day but I forgot EVEYRHING ITSOKA GERYYY LONGGG VCC EKSKSKS ILOVE VCING WTIH YOUU SND WE STARTED WATCHING S GOOD GIRL’S GUIDE TO MURDER AND STIFF EKSKS I’m actually really interatetesd bro I’m like like ITSOKA I think she’s being delusional to feed into her own guilt to not feel bad about the fact she’s the reason sal?I think the name was sal singh sal killed andie BUT IM NOT SURE ITSOKA and the show does a horrible way to imply he didn’t kill her but the horrible way is so forced so it kinda kills the immersion and kinda proves yeha sal did in fact not kill her i i i i so liek yeha itsoka ANYTWAYS LIEK YOU WERE SOSOSOS CUTEEE YOU STAFYED CRYIJG IN CALL AND LIKEC I COMFORTED YOU FOR SOO LINGG GOSHHH I LOVEEEE COMFORTING YOUU AND KMG I saw your legs i very important i love your legs soprettyy YOUJUSTSLEPTTT EKEKSK ITSONA I GO pray now and sleep god knows when OKAA SIGNING OHTT EKEKSK ILOVEYOUU BABYYYY I CANT wait for you to see all this I 💗 💗" },

    { day: 46, text: "47: oggg iwokeup veryyyvlateee and then liek youhadgogoout and so did I heloIFSOKA AND THEN YOU GOT HOME WR TALKED A LITTLE AND YOU FELL ASLEEPP YEHA and youweote a timed thingy for me and it's like your thoughts throughout the day i thinkIMGONNA RESE WHEN I GET HOME and omg you looked absolutely beautiful todaybsoooo stunning literally my princessomg😵‍💫 😵‍💫 😵‍💫 ekjdksjdjs imsoobessedwithyourlookssbyeSKDJSKSJ YOURE SOSOSOSOSNPRETTYYYY AAA and liek yeha youjustslept Im a little concerned and km edge for you cause you slept in a negativeish way because of the fact you were talkikg about mangle related shart and YEHA bro she pissesmeoffihayeher💔 💔 😢 😢  why is she like this why can't she just SNDHJSSN BE NICE TO YOU I love you ilboryou you looked absolutely beautiful today 😵‍💫 😵‍💫 iloveyiu bae iloveuou I'm so obsessed with your beauty your makeup your blush your inner firnerneyelsuhgts youreyelashesyourhairyourliosyourlelipglossyourconcesler your everything omg😵‍💫 😵‍💫 yehaiminlovebto ITSOKA SINGING OUTM.... Jlovehou" },

    { day: 45, text: "46: ong bro we SPENT THE ENTIEE DAY IN VC EKSKSKSKS LIKE 8-10 HOURS HROVIHTMGOD itsoka we completed the entirety of a good girls guide to murder season 1 and moved til episode 2 of season 2 half way through omg bro ILVOEWAFCHIJGWIRHBYOU ILOVE YOU I LOBE THIS ILOVRYOUUEOSJDOSJD THANOYIUUUFORETHSISKSJSJSJS ilvoryouo nomgomgogm you sounded absolutely ADORABLE WHOLE SLEEPY IN VC WKDJSKDJS 😵‍💫 😵‍💫 yehabro you’re all mine i love youdomuch MERIII PYAARI HASEEN BIWIII WLDJSKJS iloveyounabihapleasefojtpeaveme😢 😢 💗 💗" },

    { day: 44, text: "45: isoslepy helepp i iroforgottuhhuh ogg yeha i was atwalimaa andiwkkeupplatee andyehaicogg comehomeeandi yousleptydf f💗" },

    { day: 43, text: "44: OSKAKAKEKSKSK WEE VCDD AND ALMOST FINISHED AEASONN. 22 OGMGKKSJDKSJDKS and LMG bro you shaped metour walima dress omg bye BEKSHSJS IM APP ATTRACTED TO YOUU😵‍💫 😵‍💫 your arms your face your body your expressions your poses your everyone bye my perfect pretty beautiful prettiest angel okgndodjdkand iloveyou iloveuouilvoruouicanttakirbaIMGKNNADIEEE AAKSJDKSJS you look beautiful babe i love you and i loved vcing with you and i can’t wait to finish the season with you tomorrow iloveyiu 💗" },

    { day: 42, text: "43: Irsoka liek I WOME UP LATE oops ANS THEN LLIEK YEHA LIKE I HAD A DAWAT AYOU AHD TOUR WALIMA omg you looked so beautiful you had your black dress omg your makeup your eye shadow your lipstick and lip gloss your face concealer your blush your eyelashes your everything your hair your clothes the wayyoulookedsndposedintjesnapsandvideosaodhakdhshs😵‍💫 😵‍💫 😵‍💫  goshyouresobeuatifiulimsoioooooinloveeewitjyouubabyyyyourethemostbeaitifiuleverkwhdkwjdjs ilvoeyiu youresoprettyyyyouresoososorettyyyhePRETTIESTTTBWKDJSKDJS😵‍💫 😵‍💫 😵‍💫  my pretty baby girl gosh i love outou sijdsidj and liek YEHA ITSOKA Its 7 am oopsss im writing this while you’re awake for your thingy I should tease you about this yeha wait let me do that kill me why did i say soon BYE HELP ITSOKA LIEK TYEHA AHYWAYS YEHA ITSOKA you looked beautiful Skdjksjdjsj AND THEN LIEK I GOT HOMEEE AND I put my princess to sleeppp and tyeha here we are help IFSOKA SINGONGNG OUT.. iloveyou you looked beautiful today bae💗" },

    { day: 41, text: "42: soslepyiopspsp huhg ohhh another daeatt dawat andifelasleo forooooo loggng and wokeuplsteee oopsssandryeha f💗 yiu prettyy aseverr andtiur f voluneterringbg thingyyngy itgowell ihappy 💗 💗 dignngingout iloveyiu g💗" },

    { day: 40, text: "43: itsoka liek FINALLY NO DWAEAT NO TNIJGING BRO ITSOMA WE VCD ohh I woke up late itsoka AND THEN HEHA WE VCD FKR A BITTT SND FINISHEDD SEASON 2 OF A GOOD FIRLS GUIDE TO MURDER AND WE TALKED ALOTTF wejanly just talked bye I love talking to you I love your coid AND THEN YOU GOT SOOVSLEEPYYY EKSKSKS SOSOSOS ASORABLE AND CJTES AND YOU WENT TO SLEEP JUSTNOWWS AJDHJSJ HOW I MISS GOUVBABEEEE iloveyou💗 💗 💗 signingeitsout utsoka" },

    { day: 39, text: "42-40-39: I’m so confused what happened I think I messed up the dates or something but like yesterday was the one rest day we had yeah and we had no dawat and we vcd and allat YEHA and today was like I don’t know actually like yeha today we had the evil dawat but I did wake up esrly and we both napped and allat and yeha we talked and yeha itsoka i love you I don’t know I’m so confused oops I need to keep better track HELO ITSOKA SINGING OUT.. ohh OFFICIALLY LESS THAN 40 DYS😁 😁 and ithink alsovery big rollercoaster of emotions HELO but like yeah bae I love you, you spent so long trying to be there for me and did your absolute best and I can do nothing but thank you for all your efforts my princess how I love toi😢 😢 ejfhsjjd thankyoufroeverurjijgbabyiliveyiuilovsyouilovsyouilovwyouilobeyehaitsoka I'm so sleepy and my wifi goes out soon HELO ITSOKA singing out... Thank you for everything today though babe, ill Always be there for you too I hope you know that 🥹" },

    { day: 38, text: "38: ogggHELO ITSOKA LIKE yeha events from yesterday were very present ITSOKA YEHA HELO THE LUGJT CAME BACK SO LATE AND THEN WE JSUT talked and yeha you went to sleep and ohhh I'm still awake help I MISSYOUUUUU SOSOSONUCHH 🥺 🥺 iloveuou imgknnago work out now yeha" },

    { day: 37, text: "37: YEHA ITSOKA YOUGOTYIIR PERIOD AND LIEK YEHA VERY ROUGH DAY FOR MY POOR BABY YOU GERY REALLT SORRY FOR BEING THE WAY YOU WERE AJD I KNOW ITS REALLY HARD FOR YOU NUT SERIOUSLYYY BABYYY id never ever be upset or mad at the fact you’re upset and mad 🥹 i love you the way you are and im so grateful you show this side to me i love you any way you are no matter what condition you’re in and it’s just so cute too in a wayhelp itsoka i love you my nabi sleep well rest well, you deserve all the rest especially after this week 🥹" },

    { day: 36, text: "36: woke up the latest today oopshelpANDTHENLIEKE WE TALKED A BITT AND THEN YEHA TOU SLEPT I DONT tjink anything notcable happrnenr today i helpoops ITSOKA I go slepnow imissyousomuch 💗 💗" },

    { day: 35, text: "35: HelP A WHOLE ROLLERCOASTER OF A DYAG BRO BYE sringo went to hospital and like ohhh kidney disease or cancdf and ohhh yeha very interesting day and then he got home and like we talked and you were there for me the entire time omgbroiloveou and then I napped and then I woke up to hell waiting for me usha how nice bro and then yeha itsokaewe talked more LHH AND GOU NAPPED TOO itsokailoveyou and then you really wanted to make me sleepppp but itsoka I won at the end and you gave up and got sleepy omg my baby bro iloveyou and then yeha you slept and then I slept immediately toovhdlp I think we slept at the same time i EKSKS I'm ACTJALLY writing this tomorrow ihelp itsoka I I YEHAHELO SIGNING OHT.." },

    { day: 34, text: "34: itsoka writing this one the day after it took place too ITSOKA LILE YEHA I WAS ACTIALLY UP RERLY TODAY RHANKGOD AND WE WERE BOTH SLEEPT HEADS AND LKE WE VCD AND FELL ASLEEP AND TJEMYPU GELL ASLEEP AND THENA ITSOKA ohh i did not eat proper today did i oops HELP AND LIEK I WAS TWEAKING OROGIONALLY CAUSE OF MY ATOMACH ATUDF UBUTITSOKA NOW I TJINKN HEHA ILOVEUOUIU IMISSYOUUU EKEKSSK we both fell asleep together itsoscute ilovyveyou 💗 💗 signingoutyeha" },

    { day: 33, text: "33: itsoka liek very big emotional rollercoaster again HELP I I your periods are always like TJIS BRO ICANT itsoka but like all things said and done just like I love you Nabi, I love you so much, I wanna be there for each and every single one of your periods I wanna love you like I always have I wanna care and comfort you like I always have and even now as I type this I just wanna talk to you ask you how you are and show you the best treatment ever because you deserve it so much, you’re so sweet so kind so caring so beautiful so everything i love you so much baby no matter what state you’re in no matter what condition no matter how bad you feel no matter how sorry and guilty you feel no matter how in debt you feel babe you won’t ever understand just how much I love you and just how much I wanna be there for you just be yours I just wanna be the person you look to the second something goes wrong the person you seek help comfort consoling from just everything in wanna be your man I wanna be all nomatterwhat 💗 💗 💗 ITSOKA I might actually copy paste that to you today I really wanna tell you that especially afteryesterday i tirsokailoveuou" },

    { day: 32, text: "32: soslepy iloveyi 💗" },

    { day: 31, text: "31: IFSOKA LIKE CERY ohhh yesterday bye bro WHAT HAPPENED HELP?? i forgot yesterday honestly uhhh we we like I think it was an emotiojaknrollercoatseter for you yeha ohhh so was today help only thing i can wrap my head around is two things OHMYGOD CLEAVGE AAAA ELSJSKDJS YOURE SO PRETTYY SKDJSK and ohhh Osaid thing ooopsssss ITSOKA I DONT CARE ABOJT THAT I WAS THERE AND IS BASICALLY SOLVED WHK CARES AAAA EKSJSKSJ YOJR CLEAVGE IS😵‍💫 😵‍💫 😵‍💫 I wannadotningstoyou bro and YOHR curves and your body and your bum ohmygodAAAAAKDJDKSJDKSJDJS im hard💗 💗 yeha💗 ILOVEYOUUUU AAA EKSKSKS I go sleep now💗 💗" },

    { day: 30, text: "30: YEHA ITSOKA YOURE AT RANIAS TIGHTNOWWW AND LIEK I MISS YOUUU AAAEKSKJSKS I duno what else to write I itsokailovehiu ALSO OHMYGOFD 30 DAYS ELFTTT ELEJEHEHEHEGEGEG" },

    { day: 29, text: "29: itsoka AAAAA CLEAVEGE BRO AJDKSJDSN THATS all I remmeber help these messages thingys are getting so half baked cause I SLEPE so late now and am sleepy cause you make me stay up… itoska i happy to support you my wife i all yours but like YEHA ITSOKA you sent cleavage photo today bro that’s all that matters everything else’s can go die I just want my wife’s breastsinmymlithaaaaalsjdkdjsks iloveyiou my pretty girl AND LIKE ITSOMA YOU NAPPED AND WOMEUP AND HSHA IFSOMA ILOVEYOUUUU ELSKSKS sifningout.." },

    { day: 28, text: "28: HELP ITSOKA YOU JUST SLEPT HEHA uhhh OHHH LIEK VERY obtuse day help liek BIG GAPS IN TJE MORNING WE TALKEDD YOU CLEANED TOUR CLOSETT MYY MAIDS SHARTTT AND THEN LIEK J WAS IN CC WIRH FRIENDSA WHILE TOU WERE DOING YOUR CAMERA ASHARTT AND ALLATTT YEHAAA AIWIWIWIS SOSOMCITEEE AND NOW THEN YOU LSLELPTTT AND IM GOING TO SLEEP SOONNNN ILVORHOUUEKSKSKS oka signing out yeha💗" },

    { day: 27, text: "27; oka you just closed your eyes itsoka LIEK I CANNOT EXPRESS HOW MUCH HAPPENED TODYAVLIEK WE DID TRU VCING IN TJE MORNING AND IT LIEK YOU HAS TOW WWHIDPER WND IT FELL CAUSE THEN LIEK I HAD TO EAT AND ALLAT AND THEN TYEHA YOU WENT TO NAPP EKEKS MY BABYYY YOU NAPEPED FOR A WJOKE WOLE UP FIXY OSUSES AND NAPPED AHAIN AND THEN LIEK I WAS I. VCWITJ OSAID ANF HAMZA AND HEHA AND THEN AGTER ALLAT WE JUST TALKEDD AND LMG bro so much LIEK what what do you mean you would have my penis in your mouth wh😵‍💫 😵‍💫 😵‍💫 😵‍💫 iwantthatyehaitsokabyebroWND LIEK ALDSLDKSK EKSKS AA YOURE SOOOSOSO ADORABLEYOUSAIDYOUDKISSITTKWJDOSKD WHATT😵‍💫 😵‍💫 ilovemywifeimluckiestguyeverandyoupromisedtoowtad😵‍💫 😵‍💫 yeha irsoka allat and then you said you’d kill yiourself if I ever died or anything and just like you’d always have opptisiim in me if we weren’t a thing or if we fell out and just wow bro im gonna cry i cant i cant i cant wtaf do you mean bro😢 😢 wtafwoahwhdkshdkshdksimgonmacryagain it just THAT JUST MEANS. SO MUCH TO ME AND AS TWISTED IT SOUNDS IMSO ELDJSKSK Its so just iloveyoubro iloveyou me too yeha 😢 😢 thankyou😢 😢 wtafbro iloveyou wtaf what do you mean you’d do that it’s just so comforting like wow she truly does need me as much as I need her because id kill myself too without bro i need you im nothing with you and so are you 😢 😢 how we changed eachother 🤭 🤭 ILOVEYOUUU AAA ID GISHMORE ABOUT THIS SERUOSULY I WOULD HUT I GOTTA SLEEP NOW I PROIMISED MY WIFE I WOUDLDDD oka signing out.." },

    { day: 26, text: "26: wow bro what a day Helo IFSOKA SO LIKE YEHA I WOLE UP WE TALKEDD AND THEN WE VCD RIGJT AND IN THE VC LIKE ok bro wow so Much Oka SO LIEK UEHA YOUR LAPTOPSTIDF HELP TJE Thomson..?? Laptop I dunno what it was called OUR ADBENTJURE ON THAG AND INSTALLING STUFF AND SEEING HOW IT FINCTIONS AND STIFF AND TJEN LIEK LMG BRK YOUR SISHER SHART TODAYYY WHATTTT THE EHCKK HELP WE SAW SO MUCJ BYE SHE HAS A RELATIONSHIP WITHA. GUY NAMED FAIZAN AND HES LINDA EEIRD AS HRLL I WONT LIE BRK AND APPARBEMTLY THEH TOUCH EACHOTJER AND STIFF AND THEHRE LIKE very very sexually activr good for them bro I II I I ii. IFSOKA THEY GOT THAG AND LIEK HEHA VERY DUNNY STUFF BRO THOSE VMS IM GONNA CRY😭😭YEHA oka AND LIEK COGING ON OF COURSE WE HAVE LIKE our night talk before you fell asleep awwiee my baby yoh fell asleep and LIEK we were both LISTENTING to it doesn’t matter and my sweet passion respectively and it wa sos cute you explained your Asian regards (replace g with t) group chat and LIEK the people in it and how one of them messages you now and just it was so sweet of you thank you im gonna cry i love you and LIEK allat and we had my wisdom talk about like our love and jow I made you mine and how i wanan be with you protect you keep you safe and allat and yeha after that you eventually got sleepy and fell asleep 🥹 🥹  my babyyy dksksSLEPNWELLL OKAA SIGNING OFF.." },

    { day: 25, text: "25: wait itsoka quickly doing this one UHH LIEK ITSOMA WE GOT IPP AND CONTINUED OHR LAPTOP SDVENTURES AND WOAHHHEVERYRHING WORKED PRETTY SMOPTHLY SURPRISING AND PARSEC GLT HP AND RJNNING WELL IM SL SIRPSIED BRL WTAF AND LIEK ITSOMA WE DID UNFERTALR GENOCODE TPUTE AMD ITDLMA I HAD SOSOSO KUCH FUN WORHTPUUU AND THEN LIEK YOU WENT DOWNSTAIRS AND WE KEPT TALKING AND YOU CAME UO AND TNEN WE JUST we just legitimately just kept talking for hours on hours on end I couldn’t properly tell you but it was a really healing experience it oddly reminded me of us in real life we just genuinely kept talking and talking i miss u in rsal life.. and LIEK them you fell asleep in calll awwieee my little tiny babyyy how I love herrr and then you woke up and i waited 40ush minutes for youuuu and then you went to bed and I flirted with you until you instantly fell asleep, awiweee my babyyy SLEPE well!1!1 🤭  Oka I go sleep now SIGNING PFF.." },

    { day: 24, text: "24: itsoka you just slept so I need to quickly write this UHH IRSOKA TODAU WE LIEK WOME IP AND sringo was saddd and gloomy AND TNEN LIEK ALLAT JAPPENED AND TNEN HEJA WE VCD FOR A BITTT AND TBEN YOJ you got Nutella very very important and drank it with milk omg bro my baby girl AND LIEK THEN WE PARSECD AND JNFERTALRD AND HEJA WE ALMOST TO INDUNE OGMGOKG I CANT WAIT TO CONTINUE after 2 weeks..😢 😢  AND LIEK RHEN I WENT OUR FOR HAIRCIT AND it looks poop kill everyone AND RNEN IRSOKA WE TALKED TLR A WHIILEEE AND WE MATCHED ON STEAM AND PAYPAL LMGOMGOMG BROO EKEKSKS IMSOJAPPYYY AND HRHEN LIEK WE SNOOPED ON YOUR SISTER AND YEHA ITSOMA VERY ENTERSTINING.. ITSOMA THAGS ALLEKKSKS SIGNING OJTTT I LOVEUOUU💗 💗" },

    { day: 23, text: "23: itsoka liek flight day yeha uhh i FOLD GOU EVERYTHINGG SND TRIED MY BEST TK KEEP HODSTING YOUJU SND IN THE MORNING LIEK YOU EERE A LITTLE UPSET CSUSE KF FOXY KMG BRO I HAGE BER SND ALLAT AND HEHA AND RHEN LIEK MY FLIGJT GONE I ARRIVED SND WE WENT GKNGJR HOTEL SND I ATR AT JARDEES AND GOT CAKES AND CUPCAKES AND ALLAT AND I GOLD GOJ ALL AND EVERUTNING EKSKSKS I'm so excited to see what you did for my birthdsyomgomgomg" },

    { day: 22, text: "22: iam speech less bro, first of all HELP BYE BRO THE CONTRAST JN YOUR DAYS UNTIL MY BIRTHDAY AND MINE ARE SO FUNNY YOURE ALL LIKE SERIOUS AND SO SASSY AND KM JUST I'm just liek i can't even spell stiff right bro I'm gknan cry this is so funny bye bro BJT LIEK YOUR ENTIRE 96 TO 26 SENTIMENT EYAF BRK THAGS SO CUTEE🥺 🥺 😢 😢 iloveuou bro and your drawing im not over that i really wanna do something cute with it likeake it a widget lr something JLL SEE IFSOKA.. I NEED TOOOO OTS JUST SOOO FRICKING CUTESEE AAAJEKSKSKS and liek your entire para and your way of speaking and how much you wrote and allat you're just s dream anrl k can't even isndjskdj imgonna cry 🥺 🥺 😢 😢 come hereedepleadeee male me yojrssss !! Cause I certainlyyyy made you mine🤭  my honey bearrr my sweet swjssrolll!!1! My Nabiha Suhail, you are a treasure worth more than anything in this world could offer, I love you. Singingouttt!1!1! Bro i cfie so much you sure know how to make your boy cry😢 😢" },

    { day: 21, text: "21: guess who put you to sleep again that’s right it was meee😁 😁 ITSOKA TODAY LIEK 3RD DAY OF MY TRIP I HAD A 6 HOUR DRUVE TO LAHORE AND LIEK WE CLUKDNT REALLY TALK TALK PROPERLY TODAY UNLIME YESTERDAY WHERE WE DID TALK FKR A WHILE na DLIKE I DIDNT recap yesterdays events LIEK I ate a lot and yeha it was my birthday bro yep yeha OKA SO TODAY LIEK YEHA I AM IN LAHORE NOWWW AND WE TAKLKED FOR A BITTT AND THEN I SLEPTT AND THEN YOU WOKEUP NOOO MY BABY AND TBEN LIEK YOH CUOULDNT SLEEP SO BU SOME GOD MIRACLE I WOKE UP AND ITSOMA BRO I got dat.. my wife my work 😁 😁 IMSOHAPPY YOUSLEPTTKEJSHSHSHSHSHSH ILOVEYOUUU AAAAA IMSOSOSOSOHAPYYY ISISH YOU KNWOSJSJSKSJS iloveyou!! Oka signing out.. omg bro almost 20 days wtafff" },

    { day: 20, text: "20: itsokaliek MAJORIRYF OF THE DAY WE DIDNT TALK CAUSE YEHAAA AND LIEKCI WOKE JO LATE OOPS AND LIEK OOPSSS YEHA ITSONT HEN LIEK AT THE END WE DID RALK FKR A BITTT SND LIEK ITSKKA SPOTOFY PLAYLIST SHART INCIDENT UHOH ANS MORE AND ifsoka at the end of the day we solved it all, there will never be an unsolved case with us, ever baby, I promise. And at the end I put you to sleep 🤭 🤭 😁 😁  you reallyyyyyy are dependent on mee yknowww!! Goshiloveuou ekskskIGOSLEEPNOSWKEHSHSHSH" },

    { day: 19, text: "19: officially less than 20 days left bro wtaf that's so crazy go me, the second i get back in karachi I am LOCKING IN FOR YOUR BIRTHDAY BRO... LIKE I NEEDDD TO BE ON EXTRA GEAR 5 FOR THIS SHART... itsoka sringo got that in the future hopefully, for now, I'm working on thisss!! And something else itsoka yeha you'll see it maybe maybe? I might scrap it help I dunno BUT YEHA EKSKSKS SOSOSOSO EXICTEDD😁 😁  itsoka today liek I woke up late again yeha and then yeha I went to emporium mall and we talked and TODAY I GOT MORE OF YOUR DAD LORE AND SHART BRO HELP HE FOUND OUT ABOUT YOUR MOM'S JOB.. THATS SO SCARY WTAF 😭 😭 HELP AND THEN YEHA ITSOKA WE DISCUSSED ALLAT AND THEN WE WENT ON INSTA AND YEHA ITSOKA I JUST GOT TO THE HOTEL AFTER MY MALL TRIP YEHA WE BACK.. I GO MESSAGE MY WIFE NOW.. SIGNING OUTT 😁 😁" },

    { day: 18, text: "18: irs still kinda crazy to me bro 18 days left BUTLIEK IRSOKA TODAY WAS MT DRIVE TO ISLAMABAD AND YEHA HELO WE JUST TALKED ALOTTT AND THENVI NAPPED AND THEN WE AT HOTEL I DKNT LILE HOTEL AND HEJA ITSOKA AND WE HAD A FUNNY LITTLE FAKE BORTHDAY STORY WHCIH MR HAMZA JUNAID GELL FOR BYE JRO ITSOKA YEJA helpITSOKA IMSOSLERPYYY ITSOKA we got thisyeha signingout..💗" },

    { day: 17, text: "17: imsoslsleptpyhelp butliek uhhuhhh I was outtt and on mountainnnn you nappedpfrf isndthnrn I came bsckkk and youbwoleup you made me leakkek andliek yeha💗 💗 isoslepypy and yeha then I make you leakkk and we weresotlakaitivee todayyyy we talkedthrwhpleday practicallyyly bikdodpshappypyy thankyiu iloveuouuiu f c fisigning outit 💗" },

    { day: 16, text: "16: itsoka liek TODAY YOU HAD A PLAN WITH RANIA AND IT GOT SHOT AND DIED AND THEN YOU GUYS WENT TO SAIMA I THINK AND HEHA YOU GUYS GOT ALLST THEN YOH SNITCHED ON YOHE SISHER AND YOLD YOUR MOM SHE HAS A BF SND ITS FAIZAN AND SHE WAS OUT TODAY WATCHING SPIDER MAN AND WENT TO TIPU WITH THEM AFTERWARDS AND ALLAT LIEK YEJA AND THEN I WAS AT MY MOMS SISTERS HOUSE AND YEHA ITSOMA THEN WE TALKED A BIT WHILE I WAS IN FAR THEN MY WIFI DIED AND THEN I DIED AND YEHA WE DAME BACK AT NUGJT AT 12 and we TALKED AND we ARE talking and RIGJT noe you’re summarizing the house maid stuff for me wait i should tease you and say im doing something related to yoh oka i did it now I sign out ITSOKA you’re confused goal confused 💗 💗 KEHDHSHSH SINGING IN OUTT😁 😁 😁" },

    { day: 15, text: "15: omgbro 15 days left ELHDSJDJJS ITSOKA I WAS MAT HOTEL THE ENTIRE AND WE TALKED THE ENTIRE DAU ITSOKA LIEK WE TALKED ALOTTT BRO ITSOKA TO SUMMARIe we basBASICALLY LIEK UHHH YEHA MADE THE CINEMA PLAN AND THEN SLEPT BASICALLY ROGEHTER ITSOKA silovruouuouresocute signing out..🥺 🥺" },

    { day: 14, text: "14: less than 15 days omg ITSOKA TODAY I WENT FROM ISLAMABAD TO MALAM JABBA AND WE BARELY TALKED UNFORTUNATELY BUT ITSOKA YOU NAPPED AND ORACTICED YOUR MAKEUP MOREE TODAY ELSHSHS ILOVROUUUU YOURE so pretty omg… ilovemywifeshemineallmineomlymine💗 💗 itsokafa YEHA SINGINGOUTTT..😁 😁" },

    { day: 13, text: "13:insosepy brouhh we talkedyeha you wento parlouregothaircut andomg ileakedsomuchatyoursnaps andyouwerewithrania atdressestore andomgyoirclothesjdhdjdj ansyournewhaidcutso prettyeyoulloksprettyilovduouandliekidlslspepyif idjgnigjogu" },

    { day: 12, text: "12: helpimsosleepy wgainbroiforgotttodothissuhhh whathappened RIGHT LIEK TODAY I WENT FROM MALAM JABBA BACK TO ISLABDAD AND HEHA ITOSKA WE ACTJALLY YALKEF QUITE A BIT TODAG IMREALLY HAPPY IN THE BEFINGING SND THEN MY DATA SHART AND YEHA ITSOKA WE LIEK TALKED YEHA i doforogt hay we talked about uhh i forgot uhhhhhhhhhh LIEK we were on whatsapp and then discord and yeha itsoka play bro I FORGOT WHAG DID WE TALK ABOJT BRO ANDD awiwiee awwieie awiwieiei a wiwiweee my babyy fell asleep first okg bro shes my behbeh… i love herrrekskeks AND LIEK YOU GOT THR ENTIRE PLAN CONFIRMED FROM YOUR MOM ITSOKA OM ESOSOSO EXCITEDD EKSJDHDHDS ilvoeyiu tjanoyouforeverurjijg itsoka difngjng out… OH RUFHR WAIT I REMMEBER YOHR DAD ALSO BIFEO CALLED YOU TODAY AND LIEK YOU GOT AHFHSKHDSJJSKDJSJ IHTMYODNSHFBDBFBAJDBKSBS SBDBDJDBFND DJD SBSVSNDBSBSBSBSBS S ANS DBSNNSNA im very happy he accepted the idea of you going abroad 🥺 🥺 awieiei awieiieie awieieiee awieieiee my behbeh going out for stiudies she’s so smart i love her im gonna kiss her forehead 💗 💗 IFKSJDKDJSJ yeha irsoka im very happypy about that IFSOKA I SIGNGINOUT.. .buebye.. wdym there’s almost 10 days left wtaf ihave nothing done" },

    { day: 11, text: "11: omg bro one more day til 10 days left wtaftwatd EKSJSH ITSOKA RODAY LIEK I WWAS OHT MAJORITY OF TJE TIME SO UNFORTUNATELY I COULDNT LIRK TEXT OYOU KUCH BUT ITSOKA WE TEXTED A TINYYY BIT AND THEN YOU FELL ASLEEP ELSJSJS MY BEHBEH AND TJEN IPUTYOUTOSLEEPEPPANSYOUSLEPT YEHA AND HERE I AM TYPING THIS… itsokasigngongoutttt!! I love youuu!! SOSOSOEXCITED FOR YOURBIRRHDAYSKSKJSS😁 😁 💗 💗" },

    { day: 10, text: "10: Huh ok discords still not back so this will do for now, omg liek TEN DAYS LEFTTT TILL MY BABYYSSSSBBORTHDAYYYEKSJDHSHS IMSOOOSOE EXCITEDD AAA itsoka today like was the big day bro sringos back in karachi and liek yeha I had my fligjt today and earlier we went to the top of the mountain and allat yeha ifosma AND THEN LIEK YOU WOKE UP ESRLY AT 6-7 AND THEN SLEPT TIL 10-11 ANS LIEK YOU HAD A PRETTY SHARTY DAY CUSSE THEN AT NUGHT YOU WERE HAVING TROUBLE SLEEPING SND CRAMPS AND ALL TJAY yet you stayed up for me and were there for me and let me put you to sleep I can't thank you enough my love i love you for everything and I miss you soooo muchhh AAAA EKSKSHSHS i love you!! My babe my lady my princess my wifey my all and everything til the end and after, babe!! I need to WORKKK ON YOUR BIRTHDAY SSHRT ASAP NOW... I HAVE NOTHING DONE AND A MILLION IDEAS ITSOMA.. ELTS GOOO.!NNN!!1!1! signing outtt!!" },

    { day: 9, text: "10-9-8: what happened I’m gonna?? WHAT itsoka liek im really SLEPE but LIEK I think i did write day 10 somewhere on whatsapp when i didnt have data or something and tha was the flight day, im pretty sure..?? Itsoka liek today i was pulling the all nighter so 8 and 9 count as one day and liek tomorrow we officially meet again omg im so nervous and excited YEHA itsoka what else uhhh itsoka we had very cute convos today and toh went out to eat at lucky one you didn’t eat much but liek you were still full so itsoka im hapypyp iloveyou yeha omg and you looked really pretty today okg owahhhh you looked so pretty aaaaa elsksk YEHA itsoka💗 💗 💗 SOCLOSE TO YOUR BORTHDAYYYYY I have done nothing im scared now help ITSOKAYEHA and if I like find the 10thday one on on WhatsApp itll be there iuf not umm oops singingout!!" },

    { day: 7, text: "7: how funny only 7 days away and we met today ITSOKA I wrote a paragraph and sent it to you so liek thags my summary of today go read that if you want im sleepy 💗 💗 IMGONNA BAHSBAHSBSHSHSHS THAYS SO FUNNY IAND LAZY IN A WAY ITSOKA 💗 ilovruiu 💗" },

    { day: 6, text: "6: you didn’t take your sorryback 😢 😢 iwannacryi ITSOKA LIEK WE DID APPTTT WE SPENT THE ENTIRETY OF TODAY WITH EACHOTJER AAA EKSKSKS ILOVEYOUUUUYOUONOWWW AND LIEK WE VDD FOR SOLONGG AND TALKKK AND I MADE YOU WET SOMUCHHH EKSHSHSHSHSHSH 😁 😁  and ya!! And we watched miraculous kmgomgom AND LIEK YEHA ITSOKA OMG ILOVRYOUUSOSOSOMUCHHH I ENJOYED IT SOMUCH HELP THE FRAMES WERE SO odd i imgonnaANDLIEK ITS SOUNTRACTBIS ODDLY REALT FRICKING GOOD BRO WTAF AND YEHA ITSOKA IPOVEYOUUUUUAAAAA ILLMISS YOU YUHONEYYYEEKEKSKS and itsoka you were a very emotional rollercoaste today but i loved it, yknowww!! I love youuuu😁 😁 EITSOKA TOMORROW IS MY HAMZA THINGY MCWINGY YA ITSOKA… I love u…💗 💗 ILLMISSSYOUUUUUUUAAAA EKSKSS💗 💗  ohh and we agreed to watch Ben 10 itsoka very excited for that💗 💗 iloveyou 💗 signingoutttt!! OH WAIT TODAY I FINALLY MADE TBE ENTIRE BACKBONE OF THE THINGY I WANTED TO DO FOR YOU, now to fill it put (i have sooo much), and also to polish it a lil! Yeah!! SEE YOUUU HONEYYY SINGING IUTT💗" },

    { day: 5, text: "5: it’s so over there’s nothing done 5 days it’s so OCER ok so I um today I contacted ajwa and she ageeed to help with the thingy, yay! THATS ALL IM SL SCREAEDDSS AAAA J NEED TK SAVE THIS TOKORROW IM SO OFER OKA ANWYAYS TODAY I MET HAMZA NURPLEX SHART WENT TOVHIS JOUSE EYAH CAME BACK GOME AND TALKED TO YOU AND ALLAT AND YEHAYHEYHAYEHAYHA AND WE JUST YEHA TALKED JAD A um moment YEHA ITSOKA IT ALL TURNED OUT GOOD AT RHE END like it always does WEmRE the best couple ever BUT IRSOMA YEHA THAYS ALL I go SLEPE now help I forgot to do this oka byebye … sungingout.. 💗" },

    { day: 4, text: "4: huh, that's odd, writing this while adding it to the binder, yknow while reading all that, I never thought id see the day I actually put it into something, I didn't even know I would do this, or do anything else, for all I knew it could've been a shared note with you on the notes app, or just a doc, I really don't know!! anyways yeah, I love you Nabiha, whatever you read in the past were my thoughts before sleeping, all related to you and only you, I love you. I tried my best to write them after you slept or before I slept for some days and as such some days I was simply too sleepy or so, oops! but yeah, I love youuu!" },

    { day: 3, text: "hi this is day 3" },

    { day: 2, text: "hi this is day 2" },

    { day: 1, text: "hi this is day 1" }
];


/* =========================================================
   STATE
   ========================================================= */

let currentChapter = 0;
let currentChapterPage = 0;

let spreads = [];

let bookInitialized = false;


/* =========================================================
   UTILITY
   ========================================================= */

/**
 * Refreshes the cached list of book spreads.
 */
function refreshSpreads() {
    spreads = Array.from(
        document.querySelectorAll(".book-spread")
    );

    return spreads;
}


/**
 * Returns the actual DOM index of a spread.
 */
function getSpreadIndex(spread) {
    return spreads.indexOf(spread);
}


/**
 * Safely changes button interactivity.
 */
function setButtonState(button, enabled) {
    if (!button) {
        return;
    }

    button.style.opacity = enabled ? "1" : "0.25";
    button.style.pointerEvents = enabled ? "auto" : "none";
}


/* =========================================================
   CREATE COUNTDOWN SPREAD
   ========================================================= */

function createCountdownSpread(entry) {
    const spread = document.createElement("div");

    spread.className =
        "book-spread content-spread";

    spread.dataset.chapter = "Countdown";
    spread.dataset.day = String(entry.day);

    spread.innerHTML = `
        <div class="paper-page left-page">
            <div class="page-lines"></div>

            <div class="page-content">
                <h2>Day ${entry.day}</h2>
            </div>
        </div>

        <div class="paper-page right-page">
            <div class="page-lines"></div>

            <div class="page-content">
                <p>${entry.text}</p>
            </div>
        </div>

        <div class="crease"></div>
    `;

    return spread;
}


/* =========================================================
   CREATE CONCLUSION SPREAD
   ========================================================= */

/* =========================================================
   BUILD DYNAMIC CHAPTERS
   ========================================================= */

function buildDynamicChapters() {

    if (bookInitialized) {
        return;
    }

    bookInitialized = true;


    /* =====================================================
       FIND COUNTDOWN INSERTION POINT
       ===================================================== */

    const insertionPoint =
        document.getElementById("countdownInsertionPoint");

    if (!insertionPoint) {

        console.error(
            "Could not find #countdownInsertionPoint. Chapter 5 cannot be generated."
        );

        return;
    }


    /* =====================================================
       REMOVE ANY OLD GENERATED PAGES
       ===================================================== */

    document
        .querySelectorAll(
            '.book-spread[data-generated="true"]'
        )
        .forEach((spread) => {
            spread.remove();
        });


    /* =====================================================
       CREATE COUNTDOWN PAGES
       ===================================================== */

    const countdownSpreads = [];


    /*
     * Insert the countdown pages BEFORE the insertion point.
     *
     * The Chapter 5 title page is already in the HTML,
     * immediately before #countdownInsertionPoint.
     *
     * Therefore the order becomes:
     *
     * Chapter 5 title
     * Day 100
     * Day 99
     * Day 98
     * ...
     * Day 1
     * Chapter 6 title
     */

    [...countdownDays]
        .forEach((entry) => {

            const spread =
                createCountdownSpread(entry);

            spread.dataset.generated = "true";
            spread.dataset.chapter = "Countdown";

            insertionPoint.parentNode.insertBefore(
                spread,
                insertionPoint
            );

            countdownSpreads.push(spread);
        });


    /* =====================================================
       REMOVE INSERTION MARKER
       ===================================================== */

    insertionPoint.remove();


    /* =====================================================
       REFRESH SPREAD LIST
       ===================================================== */

    refreshSpreads();


    /* =====================================================
       CHAPTER 1
       ===================================================== */

    chapters[0].spreads = [
        0,
        1
    ];


    /* =====================================================
       CHAPTER 2
       ===================================================== */

    chapters[1].spreads = [
        2,
        3
    ];


    /* =====================================================
       CHAPTER 3
       ===================================================== */

    chapters[2].spreads = [
        4,
        5
    ];


    /* =====================================================
       CHAPTER 4
       ===================================================== */

    chapters[3].spreads = [
        6,
        7
    ];


    /* =====================================================
       CHAPTER 5
       =====================================================

       IMPORTANT:

       The Chapter 5 title page already exists in the HTML.

       It is spread 8.

       The countdown pages come AFTER it.
       ===================================================== */

    const chapter5Title =
        document.querySelector(
            '.chapter-spread[data-chapter-spread="4"]'
        );


    if (!chapter5Title) {

        console.error(
            "Chapter 5 title spread could not be found."
        );

    }


    chapters[4].spreads = [

        spreads.indexOf(chapter5Title),

        ...countdownSpreads
            .map((spread) => {
                return spreads.indexOf(spread);
            })

    ];


    /* =====================================================
       CHAPTER 6
       =====================================================

       IMPORTANT:

       The Chapter 6 title page already exists in the HTML.

       There is NO generated Conclusion page.

       This means Chapter 6 is the final page and the
       Next button stops there.
       ===================================================== */

    const chapter6Title =
        document.querySelector(
            '.chapter-spread[data-chapter-spread="5"]'
        );


    if (!chapter6Title) {

        console.error(
            "Chapter 6 title spread could not be found."
        );

    }

/* =====================================================
   CHAPTER 6
   =====================================================

   Chapter 6 has two pages, just like Chapters 1–4:

   1. Chapter 6 title page
   2. Chapter 6 content page

   The existing HTML already contains both pages.
   ===================================================== */

const chapter6Spreads =
    Array.from(
        document.querySelectorAll(
            '.book-spread[data-chapter-spread="5"]'
        )
    );


if (chapter6Spreads.length >= 2) {

    chapters[5].spreads = [
        spreads.indexOf(chapter6Spreads[0]),
        spreads.indexOf(chapter6Spreads[1])
    ];

} else {

    console.error(
        "Chapter 6 is missing its title or content spread."
    );

    chapters[5].spreads = [];
}


    /* =====================================================
       RESET BOOK
       ===================================================== */

    currentChapter = 0;
    currentChapterPage = 0;


    /* =====================================================
       DISPLAY FIRST PAGE
       ===================================================== */

    showCurrentSpread();
}

/* =========================================================
   GET CURRENT SPREAD
   ========================================================= */

function getCurrentSpread() {

    const chapter =
        chapters[currentChapter];

    if (!chapter) {
        return null;
    }

    if (
        currentChapterPage < 0 ||
        currentChapterPage >= chapter.spreads.length
    ) {
        return null;
    }

    const spreadIndex =
        chapter.spreads[currentChapterPage];

    if (
        spreadIndex === undefined ||
        spreadIndex === null
    ) {
        return null;
    }

    return spreads[spreadIndex] || null;
}


/* =========================================================
   SHOW CURRENT SPREAD
   ========================================================= */

function showCurrentSpread() {

    refreshSpreads();

    const currentSpread =
        getCurrentSpread();


    /*
     * Hide every spread first.
     */
    spreads.forEach((spread) => {
        spread.classList.remove("active");
    });


    /*
     * Then show only the current spread.
     */
    if (currentSpread) {
        currentSpread.classList.add("active");
    }


    /* =====================================================
       UPDATE CHAPTER MENU
       ===================================================== */

    chapterOptions.forEach((option, index) => {

        option.classList.toggle(
            "active",
            index === currentChapter
        );

    });


    /* =====================================================
       UPDATE BACK BUTTON
       ===================================================== */

    const atBeginning =
        currentChapter === 0 &&
        currentChapterPage === 0;

    setButtonState(
        backButton,
        !atBeginning
    );


    /* =====================================================
       UPDATE NEXT BUTTON
       ===================================================== */

    const lastChapterIndex =
        chapters.length - 1;

    const lastChapter =
        chapters[lastChapterIndex];

    const atEnd =
        currentChapter === lastChapterIndex &&
        currentChapterPage ===
            lastChapter.spreads.length - 1;

    setButtonState(
        nextButton,
        !atEnd
    );
}


/* =========================================================
   GO TO CHAPTER
   ========================================================= */

function goToChapter(chapterIndex) {

    if (
        chapterIndex < 0 ||
        chapterIndex >= chapters.length
    ) {
        return;
    }

    const chapter =
        chapters[chapterIndex];

    if (
        !chapter ||
        chapter.spreads.length === 0
    ) {
        return;
    }

    currentChapter =
        chapterIndex;

    currentChapterPage = 0;

    showCurrentSpread();

    closeChapterMenu();
}


/* =========================================================
   NEXT PAGE
   ========================================================= */

function goNext() {

    const chapter =
        chapters[currentChapter];

    if (!chapter) {
        return;
    }


    /*
     * Move forward inside the current chapter.
     */
    if (
        currentChapterPage <
        chapter.spreads.length - 1
    ) {

        currentChapterPage++;

        showCurrentSpread();

        return;
    }


    /*
     * Move to the next chapter.
     */
    if (
        currentChapter <
        chapters.length - 1
    ) {

        const nextChapterIndex =
            currentChapter + 1;

        const nextChapter =
            chapters[nextChapterIndex];

        /*
         * Do not enter an empty chapter.
         */
        if (
            !nextChapter ||
            nextChapter.spreads.length === 0
        ) {
            return;
        }

        currentChapter =
            nextChapterIndex;

        currentChapterPage = 0;

        showCurrentSpread();
    }
}


/* =========================================================
   PREVIOUS PAGE
   ========================================================= */

function goBack() {

    /*
     * Move backward inside the current chapter.
     */
    if (currentChapterPage > 0) {

        currentChapterPage--;

        showCurrentSpread();

        return;
    }


    /*
     * Move to the previous chapter.
     */
    if (currentChapter > 0) {

        const previousChapterIndex =
            currentChapter - 1;

        const previousChapter =
            chapters[previousChapterIndex];

        if (
            !previousChapter ||
            previousChapter.spreads.length === 0
        ) {
            return;
        }

        currentChapter =
            previousChapterIndex;

        currentChapterPage =
            previousChapter.spreads.length - 1;

        showCurrentSpread();
    }
}


/* =========================================================
   CHAPTER MENU
   ========================================================= */

function openChapterMenu() {

    if (!chapterMenu) {
        return;
    }

    chapterMenu.classList.add("open");
}


function closeChapterMenu() {

    if (!chapterMenu) {
        return;
    }

    chapterMenu.classList.remove("open");
}


function toggleChapterMenu() {

    if (!chapterMenu) {
        return;
    }

    chapterMenu.classList.toggle("open");
}


/* =========================================================
   CHAPTER MENU BUTTON
   ========================================================= */

if (chapterMenuButton) {

    chapterMenuButton.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            toggleChapterMenu();
        }
    );
}


/* =========================================================
   CHAPTER OPTIONS
   ========================================================= */

chapterOptions.forEach(
    (option, index) => {

        option.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                goToChapter(index);
            }
        );

    }
);


/* =========================================================
   CLICK OUTSIDE CHAPTER MENU
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (!chapterMenu) {
            return;
        }

        if (
            !chapterMenu.contains(event.target) &&
            event.target !== chapterMenuButton
        ) {
            closeChapterMenu();
        }
    }
);


/* =========================================================
   NEXT BUTTON
   ========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {
            goNext();
        }
    );
}


/* =========================================================
   BACK BUTTON
   ========================================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {
            goBack();
        }
    );
}


/* =========================================================
   KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Don't hijack arrow keys while typing.
         */
        const target =
            event.target;

        if (
            target &&
            (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            )
        ) {
            return;
        }


        switch (event.key) {

            case "ArrowRight":
                event.preventDefault();
                goNext();
                break;

            case "ArrowLeft":
                event.preventDefault();
                goBack();
                break;

            case "Escape":
                closeChapterMenu();
                break;
        }
    }
);


/* =========================================================
   CONTINUE BUTTON / INTRO
   ========================================================= */

let introFinished = false;

function enterBook() {

    if (introFinished) {
        return;
    }

    introFinished = true;


    /*
     * Fade out intro.
     */
    if (intro) {
        intro.style.opacity = "0";
    }


    /*
     * Wait for the fade before displaying the book.
     */
    setTimeout(
        () => {

            if (intro) {
                intro.style.display = "none";
            }

            if (page) {
                page.style.opacity = "1";
                page.style.pointerEvents = "auto";
            }


            /*
             * Build all dynamic pages exactly once.
             */
            buildDynamicChapters();

        },
        1500
    );
}


if (continueButton) {

    continueButton.addEventListener(
        "click",
        enterBook
    );
}


/* =========================================================
   HEART PARTICLES
   ========================================================= */

function createHeart() {

    if (!heartsContainer) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.classList.add(
        "heart-particle"
    );

    heart.textContent = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (12 + Math.random() * 18) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 7) + "s";

    heart.style.animationDelay =
        Math.random() * 2 + "s";

    heartsContainer.appendChild(
        heart
    );


    heart.addEventListener(
        "animationend",
        () => {
            heart.remove();
        },
        {
            once: true
        }
    );
}


/* =========================================================
   DARK HEART PARTICLES
   ========================================================= */

function createDarkHeart() {

    if (!darkHeartsContainer) {
        return;
    }

    const heart =
        document.createElement("div");

    heart.classList.add(
        "dark-heart"
    );

    heart.textContent = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (11 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (7 + Math.random() * 8) + "s";

    heart.style.animationDelay =
        Math.random() * 3 + "s";

    darkHeartsContainer.appendChild(
        heart
    );


    heart.addEventListener(
        "animationend",
        () => {
            heart.remove();
        },
        {
            once: true
        }
    );
}


/* =========================================================
   HEART GENERATION
   ========================================================= */

setInterval(
    createHeart,
    250
);


for (let i = 0; i < 25; i++) {
    createHeart();
}


setInterval(
    createDarkHeart,
    250
);


for (let i = 0; i < 35; i++) {
    createDarkHeart();
}


/* =========================================================
   INITIAL DOM STATE
   ========================================================= */

/*
 * The original static pages should be available immediately.
 * Dynamic Chapter 5/6 pages are not created until Continue
 * is pressed.
 */

refreshSpreads();


/*
 * Show the first static spread.
 */
showCurrentSpread();