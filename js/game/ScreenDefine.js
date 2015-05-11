

var ScreenNormal={
    IMG: 'img50',
    devicePixelRatio: 1,
    SCALE: 1,
    WIDTH: 375,
    HEIGHT: 667,
    FONT_SIZE_NORMAL: 25,
    FONT_SIZE_MAX: 30,
    FONT_SIZE_MIN: 15,
	FONT_SIZE_FREE_CASH: 17,
    FONT_SIZE_TIME: 75,
    FONT_SIZE_SCORE: 30,
    FONT_SIZE_DISCOUNT: 50,
    FONT_SIZE_DISCOUNT_SMALL: 20,
	FONT_SIZE_SPLASH: 75,
	FONT_SIZE_END: 50,
	//splash
	SPLASH: {TEXT_PLAY_OFFSET_X: 65, TEXT_PLAY_OFFSET_Y: 100, CURRENCY_ICON_OFFSET_X: 20, CURRENCY_ICON_OFFSET_Y: 150, BUTTON_OFFSET_X: 250, BUTTON_OFFSET_Y: 140},
	//tutorial
    TUTORIAL: {POSY: 300, TITLE_POSY: 252, CONTENT_POSY: 290, CONTENT_LINE_SPACE: 25, CONTENT_MAX_WIDTH: 325, TOUCH_THE_SCREEN_POSY: 370},
    //top bar
    TOP_BAR: {WIDTH: 375, HEIGHT: 100, BUTTON: {POSX: -25, POSY: 35, POSX_PRELOAD: -25, POSY_PRELOAD: -25}},
    //DJ_Table
    DJ_TABLE: {BACKGROUND: {POSX: 0, POSY: 575},BUTTON: {POSX: [35,110,183], POSY: [530, 530, 532], TOUCH_OFFSET: 125}, DISK_POS: {POSX: 350, POSY: 605}, COMBO: {POSX: -30, POSY: 50}, SCORE: {POSX: -30, POSY: 80}, TIME:{POSX: 260, POSY_SEC: 80, POSY_MILISEC: 55}},
    //music note
    MUSIC_NOTE: {POSX: [112, 145, 175, 240], POSY: -185, POSY_15NOTE: -100, POSX_OFFSET: [-3.5, -1.5, 0.5, 4], NOTE_DISTANCE: 20, NOTE_OFFSET_Y: 70, BUTTON_EFFECT: {FRAME_WIDTH: 36,FRAME_HEIGHT: 44, POSX_OFFSET: -70, POSY_OFFSET: -120}},
    //music note for optimized
    MUSIC_NOTE_OPT: {POSX: [95, 135, 167, 260], POSY: -225, POSX_OFFSET: [-3.5, -1.5, 0.5, 4], NOTE_DISTANCE: 25, NOTE_OFFSET_Y: 87, BUTTON_EFFECT: {FRAME_WIDTH: 36,FRAME_HEIGHT: 44, POSX_OFFSET: -70, POSY_OFFSET: -145}},
    //state loading
    LOADING: {BACKGROUND: {POSY: 500, LOGOY: 80}, POSX: 185, OFFSET_Y: 85, BG_OFFSET_Y: -125, TEXT_OFFSET_Y: -50, BAR: {MAX_NOTE: 30, NOTE_WIDTH: 7, HEIGHT: 17, OFFSET: 2}},
    //state end game
    END_GAME: {DIALOG_POS_Y: 250, RETRY_BUTTON_OFFSET_X: 75, RETRY_BUTTON_OFFSET_Y: -70, GETIT_BUTTON_OFFSET_X: -150, GETIT_BUTTON_OFFSET_Y: -70, YOUR_SCORE_Y: 200, SCORE_Y: 85, FREE_CASH_OFFSET_Y: 27, FREE_CASH_ICON_OFFSET_Y: -2, DISCOUNT_X: 25, DISCOUNT_Y: 313, DISCOUNT_OFFSET_Y: 18, BG_OFFSET_Y: 10, BG_TEXT_OFFSET_Y: -142, PROMOBANNER_OFFSET_X: -47, PROMOBANNER_OFFSET_Y: -35},
    //effect
    EFFECT: {LIGHT_WIDTH: 50},
};

var ScreenPixelRatio2={
    IMG: 'img',
    devicePixelRatio: 1,
    SCALE: 1,
    WIDTH: 750,
    HEIGHT: 1334,
    FONT_SIZE_NORMAL: 50,
	FONT_SIZE_NORMAL_TUTO: 30,
    FONT_SIZE_MAX: 80,
    FONT_SIZE_MIN: 30,
    FONT_SIZE_FREE_CASH: 35,
    FONT_SIZE_TIME: 150,
    FONT_SIZE_SCORE: 60,
    FONT_SIZE_DISCOUNT: 100,
    FONT_SIZE_DISCOUNT_SMALL: 40,
    FONT_SIZE_SPLASH: 150,
	FONT_SIZE_END: 100,
	//splash
	SPLASH: {TEXT_PLAY_OFFSET_X: -600, TEXT_PLAY_OFFSET_X_GAME: -600, TEXT_PLAY_OFFSET_Y: 450, TEXT_PLAY_OFFSET_Y_GAME: 600, CURRENCY_ICON_OFFSET_X: 40, CURRENCY_ICON_OFFSET_Y: 300, BUTTON_OFFSET_X: 250, BUTTON_OFFSET_Y: 150},
	//tutorial
    TUTORIAL: {POSY: 600, TITLE_POSY: 505, CONTENT_POSY: 580, CONTENT_LINE_SPACE: 50, CONTENT_MAX_WIDTH: 650, TOUCH_THE_SCREEN_POSY: 740},
    //top bar
    TOP_BAR: {WIDTH: 750, HEIGHT: 200, BUTTON: {POSX: -50, POSY: 70, POSX_PRELOAD: -50, POSY_PRELOAD: -50}},
    //DJ_Table
    DJ_TABLE: {BACKGROUND: {POSX: 0, POSY: 1150},BUTTON: {POSX: [80,230,375], POSY: [1060, 1060, 1063], TOUCH_OFFSET: 250}, DISK_POS: {POSX: 700, POSY: 1210}, COMBO: {POSX: -30, POSY: 80}, SCORE: {POSX: -30, POSY: 140}, TIME:{POSX: 700, POSY_SEC: 130, POSY_MILISEC: 80}},
    //music note
    MUSIC_NOTE: {POSX: [260, 310, 360, 440], POSY: -350, POSY_15NOTE: 0, POSX_OFFSET: [-7, -3, 1, 8], NOTE_DISTANCE: 38, NOTE_OFFSET_Y: 95, BUTTON_EFFECT: {FRAME_WIDTH: 80,FRAME_HEIGHT: 87, POSX_OFFSET: -140, POSY_OFFSET: -290}},
    //music note for optimized
    MUSIC_NOTE_OPT: {POSX: [190, 270, 355, 520], POSY: -270, POSY_15NOTE: 0, POSX_OFFSET: [-7, -3, 1, 8], NOTE_DISTANCE: 38, NOTE_OFFSET_Y: 175, BUTTON_EFFECT: {FRAME_WIDTH: 80,FRAME_HEIGHT: 87, POSX_OFFSET: -140, POSY_OFFSET: -290}},
    //state loading
    LOADING: {BACKGROUND: {POSY: 1000, LOGOY: 150}, POSX: 375, OFFSET_Y: 170, BG_OFFSET_Y: 0, TEXT_OFFSET_Y: 250, BAR: {MAX_NOTE: 30, NOTE_WIDTH: 15, HEIGHT: 35, OFFSET: 4}},
    //state end game
    END_GAME: {DIALOG_POS_Y: 500, RETRY_BUTTON_OFFSET_X: 140, RETRY_BUTTON_OFFSET_Y: -150, GETIT_BUTTON_OFFSET_X: -280, GETIT_BUTTON_OFFSET_Y: -150, YOUR_SCORE_Y: 400, SCORE_Y: 170, FREE_CASH_OFFSET_Y: 55, FREE_CASH_ICON_OFFSET_Y: -5, DISCOUNT_X: -250, DISCOUNT_Y: 837, DISCOUNT_OFFSET_Y: 35, BG_OFFSET_Y: -20, BG_TEXT_OFFSET_Y: -285, PROMOBANNER_OFFSET_X: -94, PROMOBANNER_OFFSET_Y: -70, NATURAL_DJ_TEXT_X: 200, NATURAL_DJ_TEXT_Y: 100, NOW_GET_REAL_X: 175, NOW_GET_REAL_Y: 300},
    //effect
    EFFECT: {LIGHT_WIDTH: 0},
};


var DEVICE_OS = {
    IOS:        0,
    ANDROID:    1,
    WP8:        2
};
var DEVICE_INFO={
    OS: 0,
};

var ScreenDefine = ScreenNormal;
var IOS_WEAK_DEVICE = false;
function InitScreenDefine(width, height)
{
    Utility.log("User Agent: "+navigator.userAgent);
    
    var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
    if(iOS)
    {
        if(navigator.userAgent.indexOf('iPad') != -1)
        {
            ScreenDefine = ScreenPixelRatio2;
            ScreenDefine.devicePixelRatio = 1;
        }
        else
        {
            if(width * height <= 480*320)//iphone 4
            {
                ScreenDefine = ScreenNormal;
                ScreenDefine.devicePixelRatio = 1;
                USE_OPTMZ_FOR_WEAK_DEVICE = true;
                REMOVE_GLOW_EFFECT = false;
                USE_TEXT_COLOR = true;
                Utility.log("IOS device: <= iphone 4");
            }
            else 
            {
				ScreenDefine = ScreenPixelRatio2;
                if(window.devicePixelRatio > 2)//for iphone 6 plus
                {
                    ScreenDefine.devicePixelRatio = 2;
                }
                else
                {
                    ScreenDefine.devicePixelRatio = window.devicePixelRatio;
                }
                Utility.log("IOS device: > iphone 4");
            }
        }
        DEVICE_INFO.OS = DEVICE_OS.IOS;
    }
    else if(navigator.userAgent.indexOf('Mac OS X') != -1)//ipad intel cpu
    {
        DEVICE_INFO.OS = DEVICE_OS.IOS;
        ScreenDefine = ScreenPixelRatio2;
        ScreenDefine.devicePixelRatio = window.devicePixelRatio;
    }
    else if(navigator.userAgent.indexOf('Android') != -1)
    {
        

        DEVICE_INFO.OS = DEVICE_OS.ANDROID;
        //force devicePixelRatio to 1
        ScreenDefine = ScreenPixelRatio2;
        
        if(width * height == 383*640)//temp fix bug on samsung edge: window.devicePixelRatio randome 2 or 4=> check ads server
        {
            ScreenDefine.devicePixelRatio = 1.5;//should 1.5 not 2 => improved fps
        }
        else if(window.devicePixelRatio > 3)
        {
            ScreenDefine.devicePixelRatio = 1;//1 not 2 => improved fps
        }
        else
        {
            ScreenDefine.devicePixelRatio = 1;
        }
        
        USE_OPTMZ_FOR_WEAK_DEVICE = false;
        var value = navigator.userAgent.match(/Android\s([0-9\.]*)/);
        if(value.length > 0)
        {
            Utility.log("Android version: "+value[1]);
            if(value[1] < '5')
            {
                USE_OPTMZ_FOR_WEAK_DEVICE   =   true;
                REMOVE_GLOW_EFFECT = false;
                USE_TEXT_COLOR = true;
            }
        }
    }
    else
    {
        DEVICE_INFO.OS = DEVICE_OS.WP8;
        ScreenDefine = ScreenPixelRatio2;
        ScreenDefine.devicePixelRatio = 1;
    }
    
    //SetLog(width+"x"+height +"x"+window.devicePixelRatio+"x"+ScreenDefine.devicePixelRatio);
    
    if(USE_OPTMZ_FOR_WEAK_DEVICE)
    {
        //MUSIC_NOTE_OPT: {POSX: [112, 145, 175, 240], POSY: -185, POSX_OFFSET: [-3.5, -1.5, 0.5, 4], NOTE_DISTANCE: 20, NOTE_OFFSET_Y: 70, BUTTON_EFFECT: {FRAME_WIDTH: 36,FRAME_HEIGHT: 44, POSX_OFFSET: -70, POSY_OFFSET: -120}},
        ScreenDefine.MUSIC_NOTE.POSX            = ScreenDefine.MUSIC_NOTE_OPT.POSX;
        ScreenDefine.MUSIC_NOTE.POSY            = ScreenDefine.MUSIC_NOTE_OPT.POSY;
        ScreenDefine.MUSIC_NOTE.POSX_OFFSET     = ScreenDefine.MUSIC_NOTE_OPT.POSX_OFFSET;
        ScreenDefine.MUSIC_NOTE.NOTE_DISTANCE   = ScreenDefine.MUSIC_NOTE_OPT.NOTE_DISTANCE;
        ScreenDefine.MUSIC_NOTE.NOTE_OFFSET_Y   = ScreenDefine.MUSIC_NOTE_OPT.NOTE_OFFSET_Y;
    }
}

function HostImagePath()
{
    return ScreenDefine.IMG;
}

