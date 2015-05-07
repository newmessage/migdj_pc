/**
 * Author: hung.phamviet@gameloft.com
 */

const GAME_STATE_PRELOAD	=	1 << 0;
const GAME_STATE_LOADING	=	1 << 1;
const GAME_STATE_PLAY		=	1 << 2;
const GAME_STATE_GAMEOVER	=	1 << 3;

const MAX_COMBO = 20;
const LIGHTNING_TIME = 1000;

const BLUE_R_VAL = 100;//169;
const BLUE_G_VAL = 250;//250;
const BLUE_B_VAL = 255;//255;

function GameCore() {
	
	var m_state = GAME_STATE_PRELOAD;
	var main_background = null;
	var background = null;
	var lightning = null;
	var lightning_red = null;
	var current_light_time = 0;
	
	var alpha_list = [0, 0.3, 0.45, 0.6, 0.75, 0.9];
	var current_alpha = 0;
	
	/*
	 * define function
	 */
	this.Init = Init;
	this.Render = Render;
	this.Update = Update;
    
    
	
	/*
	 * Implement
	 */
	
	//init
	function Init() 
    {
        
        //init sound
        AudioManager.Init();
        //init topbar
        //TopBar.Init();
	}
	
	//render
	function Render()
	{
		switch(m_state)
		{
        case GAME_STATE_PRELOAD:
            StatePreLoad.Draw();
            break;
		case GAME_STATE_LOADING:
			StateLoading.Draw();
			break;
		case GAME_STATE_PLAY:
			this.DrawBackGround();

            MusicNoteManager.Draw();
            DJ_Table.DJ_Draw();
			break;
		case GAME_STATE_GAMEOVER:
            
			//this.DrawBackGround();
                
            //MusicNoteManager.Draw();
			DJ_Table.DJ_Draw();
			
			StateEndGame.End_Draw();
			     
			break;
		}		
	}
	//update
	function Update(deltaTime)
	{
		switch(m_state)
		{
        case GAME_STATE_PRELOAD:
            StatePreLoad.Update(deltaTime);
            break;
		case GAME_STATE_LOADING:
			StateLoading.Update(deltaTime);
			break;
		case GAME_STATE_PLAY:
            if(!REMOVE_GLOW_EFFECT)
            {
                if(current_light_time > 0)
                {
                    current_light_time -= deltaTime;
                    if (!USE_TEXT_COLOR)
                    {
                        lightning.alpha = lightning.alpha + ((Math.random()*0.03) -0.03 );
                    }
                    lightning2.alpha = lightning.alpha;
                    lightning3.alpha = lightning2.alpha;
                    lightning4.alpha = lightning3.alpha;
                    //lightning.alpha *= current_light_time / LIGHTNING_TIME;
                    lightning_red.alpha *= current_light_time / LIGHTNING_TIME;
                    lightning_red2.alpha = lightning_red.alpha;
                    lightning_red3.alpha = lightning_red2.alpha;
                    lightning_red4.alpha = lightning_red3.alpha;
                    if (USE_TEXT_COLOR)
                    {
                        if (lightning_red.alpha > 0.0)
                        {
                            var textLightAlpha = 1.0 - lightning_red.alpha;
                            DJ_Table.textColor = rgbToHex(255,textLightAlpha* 255,textLightAlpha* 255);//"#0000FF";
                            //Utility.log(' color alpha of red ' + textLightAlpha);
                        }
                        else if (lightning.alpha > 0.0)
                        {
                            lightning.alpha *= current_light_time / LIGHTNING_TIME;
                            var textLightAlpha = lightning.alpha;//current_light_time / LIGHTNING_TIME;
                            var calc_r = 255 - ((255 - BLUE_R_VAL)*textLightAlpha);
                            var calc_g = 255 - ((255 - BLUE_G_VAL)*textLightAlpha);
                            var calc_b = 255 - ((255 - BLUE_B_VAL)*textLightAlpha);
                            DJ_Table.textColor = rgbToHex(calc_r,calc_g,calc_b);//"#FF0000";
                            //DJ_Table.textColor = rgbToHex(textLightAlpha* BLUE_R_VAL,textLightAlpha* BLUE_G_VAL,BLUE_B_VAL);//"#0000FF";
                            //Utility.log(' color alpha of blue ' + textLightAlpha);
                        }
                    }
                }
                else
                {
                    lightning.alpha = 0;
                    lightning2.alpha = 0;
                    lightning3.alpha = 0;
                    lightning4.alpha = 0;
                    lightning_red.alpha = 0;
                    lightning_red2.alpha = 0;
                    lightning_red3.alpha = 0;
                    lightning_red4.alpha = 0;
                    if (USE_TEXT_COLOR)
                    {
                        DJ_Table.textColor = "#FFFFFF";
                        //Utility.log(' color white ');
                    }
                }
            }
			DJ_Table.Update(deltaTime);
			if(!DJ_Table.IsInTutorial())
				MusicNoteManager.Update(deltaTime);
			
			break;
		case GAME_STATE_GAMEOVER:
			StateEndGame.Update();
			break;
		}
		 
	}
	
    function rgbToHex(r, g, b) 
    {
        r = parseInt(r,10);
        g = parseInt(g,10);
        b = parseInt(b,10);
        //Utility.log(' color from hex ' + "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }    
    
	this.ChangeState = function(state) {
		m_state = state;
	};
	
	this.Show = function()
	{
		AudioManager.Resume();
	};
	this.Hide = function()
	{
		AudioManager.Pause();
	};
    
    this.LoadBackGround = function()
    {
        
        if(!USE_OPTMZ_FOR_WEAK_DEVICE)
        {
            background = new Object();
            background.Load(BACKGROUND_LINK + HostImagePath() + "/bg/bgPlay.png");
            background.SetPos(-65, 60);
            //background.SetScale(2, 2);
			
			main_background = new Object();
			main_background.Load(BACKGROUND_LINK + HostImagePath() + "/bg/bg_gameplay.jpg");
			//main_background.SetScale(1.5, 1.5);
			//main_background.SetPos(Graphic.width>>1, ScreenDefine.TUTORIAL.POSY);
			main_background.SetPos(Graphic.width>>1, ScreenDefine.TUTORIAL.POSY);
			main_background.SetAnchor(H_CENTER|V_CENTER);
        }
        
        if(!REMOVE_GLOW_EFFECT)
        {
            var posy = Graphic.RealHeight()- Graphic.GetOffsetRatio();
            if(Graphic.IsPortrait())
            {
				console.log('masuk sini ++++ ');
                posy = Graphic.RealWidth()- Graphic.GetOffsetRatio();
            }
            
            lightning = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/blue_lightning.png");
            }
            lightning.SetPos(- Graphic.GetOffsetRatio(), 0);
            lightning.alpha = 0;
            lightning.SetScale(4, 4);

            lightning2 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning2.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/blue_lightning.png");
            }
            lightning2.SetPos(- Graphic.GetOffsetRatio(), posy);
            lightning2.alpha = 0;
            lightning2.SetScale(4, -4);
			
			lightning3 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning3.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/blue_lightning.png");
            }
            lightning3.SetPos(posy, 0);
            lightning3.alpha = 0;
            lightning3.SetScale(-4, 4);
			
			lightning4 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning4.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/blue_lightning.png");
            }
            lightning4.SetPos(posy, posy);
            lightning4.alpha = 0;
            lightning4.SetScale(-4, -4);

            lightning_red = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning_red.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/red_lightning.png");
            }
            lightning_red.SetPos( - Graphic.GetOffsetRatio(), 0);
            lightning_red.alpha = 0;
            lightning_red.SetScale(4, 4);

            lightning_red2 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning_red2.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/red_lightning.png");
            }
            lightning_red2.SetPos(- Graphic.GetOffsetRatio(), posy);
            lightning_red2.alpha = 0;
            lightning_red2.SetScale(4, -4);
			
			lightning_red3 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning_red3.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/red_lightning.png");
            }
            lightning_red3.SetPos(posy, 0);
            lightning_red3.alpha = 0;
            lightning_red3.SetScale(-4, 4);
			
			lightning_red4 = new Object();
            if (!USE_TEXT_COLOR)
            {
                lightning_red4.Load(LIGHT_EFFECT_LINK + HostImagePath() + "/bg/red_lightning.png");
            }
            lightning_red4.SetPos(posy, posy);
            lightning_red4.alpha = 0;
            lightning_red4.SetScale(-4, -4);
        }
    };
    
    this.IsFinishLoadBG = function()
    {
        var result = true;
        
        if(!USE_OPTMZ_FOR_WEAK_DEVICE)
        {
            result &= (background.IsLoaded() && main_background.IsLoaded());
        }
        if(!REMOVE_GLOW_EFFECT && !USE_TEXT_COLOR)
        {
            result &= (lightning.IsLoaded() && lightning_red.IsLoaded());
        }
        
        return result;
    };
    
	this.DrawBackGround = function() {
        if(!USE_OPTMZ_FOR_WEAK_DEVICE)
        {
			if(main_background != null)
			{
				main_background.Draw();
			}
            if(background != null)
            {
                background.Draw();
            }
        }
        if(!REMOVE_GLOW_EFFECT)
        {
            if(lightning != null && lightning.alpha > 0)
            {
                if (!USE_TEXT_COLOR)
                {
                    lightning.Draw();
                    lightning2.Draw();
					lightning3.Draw();
					lightning4.Draw();
                }
            }
            if(lightning_red != null && lightning_red.alpha > 0)
            {
                if (!USE_TEXT_COLOR)
                {
                    lightning_red.Draw();
                    lightning_red2.Draw();
					lightning_red3.Draw();
					lightning_red4.Draw();
                }
            }
        }
	};
	
	this.SetLightning = function(isHit, combo_value)
	{
        if(!REMOVE_GLOW_EFFECT)
        {
            current_light_time = LIGHTNING_TIME;
            if(isHit)
            {
                if(combo_value < alpha_list.length)
                {
                    lightning.alpha = alpha_list[combo_value-1];//Math.min(combo_value,MAX_COMBO) / MAX_COMBO;
                    if (USE_TEXT_COLOR)
                    {
                        lightning.alpha = 1.0;
                        var textLightAlpha = lightning.alpha;
                        var calc_r = 255 - ((255 - BLUE_R_VAL)*textLightAlpha);
                        var calc_g = 255 - ((255 - BLUE_G_VAL)*textLightAlpha);
                        var calc_b = 255 - ((255 - BLUE_B_VAL)*textLightAlpha);
                        DJ_Table.textColor = rgbToHex(calc_r,calc_g,calc_b);//"#FF0000";
                        //Utility.log('set light blue combo small');
                        //current_alpha++;
                    }
                }
                else
                {
                    lightning.alpha = 1.0;
                    if (USE_TEXT_COLOR)
                    {
                        var textLightAlpha = 0.0;
                        DJ_Table.textColor = rgbToHex(BLUE_R_VAL,BLUE_G_VAL,BLUE_B_VAL);//"#FF0000";
                        //Utility.log('set light blue combo big');
                    }
                }
            }
            else
            {
                current_alpha = 0;
                lightning.alpha = 0.0;
                lightning_red.alpha = 1.0;
                if (USE_TEXT_COLOR)
                {
                    var textLightAlpha = 1.0 - lightning_red.alpha;
                    //DJ_Table.textColor = "#FF0000";
                    DJ_Table.textColor = rgbToHex(255,textLightAlpha* 255,textLightAlpha* 255);//"#FF0000";
                    //Utility.log('not hit');
                }
            }
        }
	};
	
	this.ResetLight = function()
	{
        if(!REMOVE_GLOW_EFFECT)
        {
            lightning.alpha = 0.0;
            lightning_red.alpha = 0.0;
            //DJ_Table.textColor = "#FFFFFF";
        }
	}
}
var GameCore = new GameCore();