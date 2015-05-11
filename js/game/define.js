/**
 * hung.phamviet
 */


const VERSION               =   '1.0.8';

//sound
const SOUND_BG_MUSIC1		=	0;
const SOUND_BG_MUSIC2		=	1;
const SOUND_MUSIC_COUNT		=	2;

const SOUND_SFX_FAIL		=	2;
const SOUND_SFX_COUNT		=	1;

const SPLASH_LINK           = SERVER_URL;
const SPLASH_BTN_LINK       = SERVER_URL;
const LOADING_BG_LINK		= SERVER_URL;
const LOADING_LOGO_LINK		= SERVER_URL;
const LOADING_DISC_LINK		= SERVER_URL;
const LIGHT_EFFECT_LINK 	= SERVER_URL;
const BACKGROUND_LINK		= SERVER_URL;
const TOPBAR_CLOSE_BTN_LINK = SERVER_URL;
const CURRENCY_ICO_LINK     = SERVER_URL;
const TUTO_BG_LINK          = SERVER_URL;
const DISK_TABLE_LINK       = SERVER_URL;
const DJ_BTN_LINK           = SERVER_URL;
const DJ_BG_LINK            = SERVER_URL;
const DJ_DISK_LINK          = SERVER_URL;
const NOTE_LINK             = SERVER_URL;
const BTN_EFFECT_LINK       = SERVER_URL;
const BTN_RETRY_LINK        = SERVER_URL;
const BTN_GETIT_LINK        = SERVER_URL;
const END_BG_LINK           = SERVER_URL;
const END_BG_TEXT_LINK      = SERVER_URL;
const END_BG_PROMO_LINK     = SERVER_URL;


var SOUND_FILES = 
	[
		{file:	"data/sound/1.mp3", 			volume:	1},
		{file:	"data/sound/2.mp3", 			volume:	1},
		{file:	"data/sound/sfx_DJ_fail.mp3",	volume:	0.2}
	];

var m_note_beat_number=[2,2,2,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,2,1,1,1,1,1,3,2,1,1,1,1,1,3,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,2,1,1,3,3,2,2,1,1,1,2,3,2,1,2];
var m_note_beat_time=[2.404689,2.933074,3.381662,3.874166,3.974166,4.074166,4.174166,4.274166,4.374166,4.474166,4.574166,4.674166,4.957000,5.057000,5.157000,5.257000,5.357000,5.457000,5.557000,5.657000,5.757000,5.857000,5.957000,6.057000,6.157000,6.257000,6.357000,6.457000,6.557000,6.657000,6.757000,6.857000,6.957000,7.457000,7.966293,8.433118,8.882654,9.371092,9.816305,10.291776,10.758601,11.225427,11.679285,12.150433,12.604291,13.084084,13.542265,14.004768,14.471594,14.929775,15.392278,15.889360,16.321606,16.814367,17.250935,17.743696,18.193231,18.681669,19.122560,19.580741,20.047566,20.518714,21.011475,21.439398,21.910546,22.642000,22.742000,22.842000,22.942000,22.042000,23.142000,23.242000,23.342000,23.442000,23.542000,23.642000,23.742000,23.842000,24.703509,24.803509,24.903509,25.003509,25.103509,25.203509,25.303509,25.403509,25.503509,25.603509,26.303509,26.403509,26.503509,26.603509,26.703509,26.803509,26.903509,27.003509,27.103509,27.203509,27.303509,27.403509,27.503509,27.903509,28.048598,28.148598,28.248598,28.348598,28.448598,28.548598,28.648598,28.748598,28.848598,28.948598,29.048598,29.148598,29.248598,29.348598,30.762943,31.225446,31.700917,32.141808,32.621601,33.062491,33.559574,33.996143,34.475936,34.934116,35.413909,35.854800,36.351883,36.792774,37.259599];


var COUNTRY={
    EN: {value: 0, language: 'EN'},
    US: {value: 1, language: 'EN'},
    UK: {value: 2, language: 'EN'},
    FR: {value: 3, language: 'FR'},
    ES: {value: 4, language: 'ES'},
    IT: {value: 5, language: 'IT'},
    DE: {value: 6, language: 'DE'},
};

var m_unknown_country = false;

function GetCurrentCountry()
{
	m_unknown_country = false;
	
    var country = COUNTRY.EN;
    if(typeof deviceCountry != 'undefined')
    {
        var mdeviceCountry = deviceCountry.toUpperCase();
        
        if(mdeviceCountry == 'US')
        {
            country = COUNTRY.US;
			m_unknown_country = true;
        }
        else if(mdeviceCountry == 'GB')
        {
            country = COUNTRY.UK;
        }
        else if(mdeviceCountry == 'FR')
        {
            country = COUNTRY.FR;
        }
        else if(mdeviceCountry == 'ES')
        {
            country = COUNTRY.ES;
        }
		else if(mdeviceCountry == 'SP')
        {
            country = COUNTRY.ES;
        }
        else if(mdeviceCountry == 'IT')
        {
            country = COUNTRY.IT;
        }
        else if(mdeviceCountry == 'DE')
        {
            country = COUNTRY.DE;
        }
		else
		{
			m_unknown_country = true;
		}
    }
    return country;
}

var GAME_COUNTRY               =   GetCurrentCountry();


var PRODUCT_LINK=[
    'http://www.amazon.com/Hercules-DJ-Series-4780771-Controller/dp/B00NALMHLQ/ref=sr_1_13?ie=UTF8&qid=1418996958&sr=8-13&keywords=hercules+dj+control+air&pebp=1418996948296',//EN
    'http://www.amazon.com/Hercules-DJ-Series-4780771-Controller/dp/B00NALMHLQ/ref=sr_1_13?ie=UTF8&qid=1418996958&sr=8-13&keywords=hercules+dj+control+air&pebp=1418996948296',//US
    'http://shop.hercules.com/en_gb/djcontrol-air-s-series.html?utm_source=gameloft&utm_medium=mobilead&utm_campaign=airdjUK',//UK
    'http://shop.hercules.com/fr_fr/djcontrol-air-s-series.html?utm_source=gameloft&utm_medium=mobilead&utm_campaign=airdjFR',//FR
    'http://shop.hercules.com/es_es/djcontrol-air-s-series.html?utm_source=gameloft&utm_medium=mobilead&utm_campaign=airdjES',//ES
    'http://shop.hercules.com/it_it/djcontrol-air-s-series.html?utm_source=gameloft&utm_medium=mobilead&utm_campaign=airdjIT',//IT
    'http://shop.hercules.com/de_de/djcontrol-air-s-series.html?utm_source=gameloft&utm_medium=mobilead&utm_campaign=airdjDE',//DE
];

var TEXT={
    EN: {
            GREAT_SCORE:                ' POINTS, GREAT SCORE!',
            TRY_AGAIN_SCORE:            " POINTS, PLEASE TRY AGAIN!",
            YOU_JUST_WON:               'You just won a reward',
            TUTORIAL_TAP:               'Tap to continue',
            TUTORIAL_TAP_DESKTOP:       'Tap / Press Enter to continue',
            TUTORIAL_TEXT:              'Tap the buttons and scratch the disc as the notes approach you.',
            TUTORIAL_TEXT_DESKTOP:      'Press 1, 2, 3 buttons and scratch the disc with the mouse as the notes approach you.', 
            TUTORIAL_TITLE:             'Be a great DJ in 38 seconds!',
            TUTORIAL_TITLE_40S:         'Be a great DJ in 40s!',
            LOADING:                    'LOADING...',
            END_SCREEN_DISCOUNT_1:      '10% DISCOUNT',
            END_SCREEN_DISCOUNT_2:      'USING PROMO CODE',
			END_SCREEN_DISCOUNT_3:      'AIRMIX',
            END_SCREEN_NATURAL_DJ:      "YOU'RE A NATURAL BORN DJ",
            END_SCREEN_NOW_GET:      	'NOW GET THE REAL DEAL !',
            SPLASH_TEXT_PLAY:           'Play a quick DJ mini game and',
            SPLASH_TEXT_GET:            'GET A REWARD',
            SPLASH_TEXT_PLAY_NO_REWARD:  'Play a quick',
            SPLASH_TEXT_GET_NO_REWARD:   'DJ MINI GAME',
        },
    FR: {
            GREAT_SCORE:                ' POINTS, JOLI SCORE !',
            YOU_JUST_WON:               'TU VIENS DE GAGNER 5',
            TUTORIAL_TAP:               'Touche pour continuer',
            TUTORIAL_TAP_DESKTOP:       'Tapez / Appuyez sur Entrée pour fortsætte',
            TUTORIAL_TEXT:              'Touche les icônes et scratche pendant que les notes défilent vers toi.',
            TUTORIAL_TEXT_DESKTOP:      'Appuyez sur les boutons / touches 1, 2, 3 boutons et de rayer le disque que les notes que vous approchent.', 
            TUTORIAL_TITLE:             'Deviens un grand DJ en 38 s !',
            TUTORIAL_TITLE_40S:         'Deviens un grand DJ en 40 s !',
            LOADING:                    'CHARGEMENT...',
            END_SCREEN_DISCOUNT_1:      '10% DE PROMO',
            END_SCREEN_DISCOUNT_2:      'AVEC LE CODE AIRDJ',
            SPLASH_TEXT_PLAY:           'Joue à un mini-jeu rapide de DJ et',
            SPLASH_TEXT_GET:            'OBTIENS 5',
            SPLASH_TEXT_PLAY_NO_REWARD:  'Play a quick DJ mini game',
        },
    ES: {
            GREAT_SCORE:                ' PUNTOS, GRAN PUNTUACIÓN!',
            YOU_JUST_WON:               'HAS GANADO 5 ',
            TUTORIAL_TAP:               'Toca para continuar',
            TUTORIAL_TAP_DESKTOP:       'Toque / Pulse Intro para fortsætte',
            TUTORIAL_TEXT:              'Toca los iconos y haz scratch con el disco a medida que las notas se te acercan.',
            TUTORIAL_TEXT_DESKTOP:      'Toque los botones / Pulse 1, 2, 3 botones y rayar el disco como las notas que se aproximan.', 
            TUTORIAL_TITLE:             '¡Sé un gran DJ en 38 s!',
            TUTORIAL_TITLE_40S:         '¡Sé un gran DJ en 40 s!',
            LOADING:                    'CARGANDO...',
            END_SCREEN_DISCOUNT_1:      '10% MENOS',
            END_SCREEN_DISCOUNT_2:      'CON EL CÓDIGO AIRDJ',
            SPLASH_TEXT_PLAY:           'Completa un minijuego rápido de DJ y',
            SPLASH_TEXT_GET:            'CONSIGUE 5',
            SPLASH_TEXT_PLAY_NO_REWARD:  'Play a quick DJ mini game',
        },
    IT: {
            GREAT_SCORE:                ' PUNTI, BEL PUNTEGGIO!',
            YOU_JUST_WON:               'HAI VINTO 5',
            TUTORIAL_TAP:               'Tocca per continuare',
            TUTORIAL_TAP_DESKTOP:       'Toccare / Premere Invio per fortsætte',
            TUTORIAL_TEXT:              'Tocca i pulsanti e scratcha i piatti quando le note si avvicinano.',
            TUTORIAL_TEXT_DESKTOP:      'Toccare i / Stampa 1, 2, 3 tasti tasti e graffiare il disco come le note si avvicina.', 
            TUTORIAL_TITLE:             'Diventa un DJ in 38s!',
            TUTORIAL_TITLE_40S:         'Diventa un DJ in 40s!',
            LOADING:                    'CARICAMENTO...',
            END_SCREEN_DISCOUNT_1:      '10% DI SCONTO',
            END_SCREEN_DISCOUNT_2:      'COL CODICE AIRDJ',
            SPLASH_TEXT_PLAY:           'Gioca al minigioco del DJ e',
            SPLASH_TEXT_GET:            'OTTIENI 5',
            SPLASH_TEXT_PLAY_NO_REWARD:  'Play a quick DJ mini game',
        },
    DE: {
            GREAT_SCORE:                ' PUNKTE, GROSSARTIG!',
            YOU_JUST_WON:               'DU HAST GERADE GEWONNEN : 5',
            TUTORIAL_TAP:               'Berühren: Weiter',
            TUTORIAL_TAP_DESKTOP:       'Tap / Tryk Enter for at fortsætte',
            TUTORIAL_TEXT:              'Berühre die Tasten und scratche die Scheibe, während sich die Noten nähern.',
            TUTORIAL_TEXT_DESKTOP:      'Tryk på knapperne / Tryk 1, 2, 3 knapper og ridse disken som du nærmer dig noterne.', 
            TUTORIAL_TITLE:             'Werde in 38 Sek. zum klasse DJ!',
            TUTORIAL_TITLE_40S:         'Werde in 40 Sek. zum klasse DJ!',
            LOADING:                    'LÄDT...',
            END_SCREEN_DISCOUNT_1:      '10% RABATT',
            END_SCREEN_DISCOUNT_2:      'MIT PROMO-CODE AIRDJ',
            SPLASH_TEXT_PLAY:           'Spiele ein schnelles DJ-Minispiel und',
            SPLASH_TEXT_GET:            'ERHALTE 5',
            SPLASH_TEXT_PLAY_NO_REWARD:  'Play a quick DJ mini game',
        },
};

function GetText()
{
    return TEXT[GAME_COUNTRY.language];
}

function GetProduceLink(country)
{
    return PRODUCT_LINK[country.value];
}

