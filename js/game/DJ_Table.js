/**
 * hung.phamviet
 */

var PLAY_TIMES		=	38 * 1000;

const BACKGROUND_MUSIC_VOLUME_ACTIVE	=	0.8;
const BACKGROUND_MUSIC_VOLUME_NOACTIVE	=	0.2;

function DJ_Table()
{
	const MAX_SPEED = 2;
	
	this.tuto_bg = null;
	var isInTutorial = false;
	
	var isInEndGame = false;
	
	var button = null;
	var dg_bg = null;
	var dj_disk = null;
	
	var m_score = 0;
	var m_target = 25;
	var m_playerTimeCounter = PLAY_TIMES;
	
	var goodMove = null;
	var activeGoodMoveFrame = 0;
	var badMove = null;
	var activeBadMoveFrame = 0;
	
	var diskRotateFrame = 40;
	var diskCurrentFrame = 0;
	var isDiskRotating = false;

	var activeComboFrame = 0;
    
    this.firstTimeReward = true;
    
    var tutorial_text = null;
    
    this.textColor = "#000000";
	
	this.LoadData = function() {
		
		this.tuto_bg = new Object();
		this.tuto_bg.Load(TUTO_BG_LINK + HostImagePath() + "/bg/score_board.png");
		this.tuto_bg.SetAnchor(H_CENTER|V_CENTER);
		this.tuto_bg.SetPos(Graphic.width>>1, ScreenDefine.TUTORIAL.POSY);
		this.tuto_bg.SetScale(2, 2);
		isInTutorial = true;
        //firstTimeReward = true;
		
		
		button = [];
		for(var i=0; i < 3; i++)
		{
			button[i] = new DJButton(i, DJ_BTN_LINK + HostImagePath() + "/button/button"+(i+1)+".png", DJ_BTN_LINK + HostImagePath() + "/button/button"+(i+1)+"_active.png", DJ_BTN_LINK + HostImagePath() + "/button/button"+(i+1)+"_miss.png", ScreenDefine.DJ_TABLE.BUTTON.POSX[i], ScreenDefine.DJ_TABLE.BUTTON.POSY[i]);
			button[i].SetAnchor(H_CENTER|V_CENTER);
		}
		
		dg_bg = new Object();
		dg_bg.Load(DJ_BG_LINK + HostImagePath() + "/bg/dj_bg.png");
        dg_bg.SetPos(Graphic.width >> 1, ScreenDefine.DJ_TABLE.BACKGROUND.POSY);
		dg_bg.SetAnchor(H_CENTER|V_CENTER);
		
		dj_disk = new Object();
		dj_disk.Load(DJ_DISK_LINK + HostImagePath() + "/button/dj_disk.png");
		dj_disk.SetPos(ScreenDefine.DJ_TABLE.DISK_POS.POSX, ScreenDefine.DJ_TABLE.DISK_POS.POSY);
		dj_disk.SetAnchor(H_CENTER|V_CENTER);
		dj_disk.SetScale(2.4, 1.8);
		
		this.Load(DISK_TABLE_LINK + HostImagePath() + "/button/disk.png");
		this.SetPos(ScreenDefine.DJ_TABLE.DISK_POS.POSX, ScreenDefine.DJ_TABLE.DISK_POS.POSY - 10);
		this.SetAnchor(H_CENTER|V_CENTER);
		this.SetScale(1.2, 0.9);
        
        tutorial_text = Graphic.WrapText(GetText().TUTORIAL_TEXT, ScreenDefine.TUTORIAL.CONTENT_MAX_WIDTH, ScreenDefine.TUTORIAL.CONTENT_LINE_SPACE, ScreenDefine.FONT_SIZE_NORMAL);
	};
    
    this.ChangePlayTime = function()
    {
        //for 40s version
        PLAY_TIMES		=	40 * 1000;
        m_playerTimeCounter = PLAY_TIMES;
    }
	
	this.Init = function() {
        
		m_score = 0;
		m_playerTimeCounter = PLAY_TIMES;
		isInTutorial = true;
		isInEndGame = false;
        
        total_fps = 0;
        average_fps = 0;
        cur_frame = 0;
        
		//reset note
		MusicNoteManager.Reset();
	};
    
    this.Loaded = function()
    {
        for(var i=0; i < 3; i++)
        {
            if(!button[i].IsLoaded())return false;
        }

        return this.tuto_bg.IsLoaded() && dg_bg.IsLoaded() && dj_disk.IsLoaded() && this.IsLoaded();
        
    };
	
	var m_shouldPlayBackGroundSound = false;
	this.PlayBackgroundSound = function()
	{
		if(m_shouldPlayBackGroundSound)
		{
            
            /*
            if(DEVICE_INFO.OS == DEVICE_OS.ANDROID)
            {
                AudioManager.Play(SOUND_BG_MUSIC1, true);
                AudioManager.SetVolume(SOUND_BG_MUSIC1, 0);
            }
            else
            */
            {
                AudioManager.Play(SOUND_BG_MUSIC1, true);
                AudioManager.Play(SOUND_BG_MUSIC2, true);

                AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_NOACTIVE);
                AudioManager.SetVolume(SOUND_BG_MUSIC2, 0);
            }
		}
		m_shouldPlayBackGroundSound = false;
	};
	this.PlayFailSound = function() {
        //if(DEVICE_INFO.OS != DEVICE_OS.ANDROID)
            AudioManager.Play(SOUND_SFX_FAIL, false);
	};
	
	this.PlayMissSound = function() 
	{
        /*
        if(DEVICE_INFO.OS == DEVICE_OS.ANDROID)
        {
            AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_NOACTIVE);
        }
        else
        */
        {
            //only mute sound
            //AudioManager.Play(SOUND_SFX_FAIL, false);
            AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_NOACTIVE);
            AudioManager.SetVolume(SOUND_BG_MUSIC2, 0);
        }
	};
	
	this.PlayPerfectSound = function() 
	{
        /*
        if(DEVICE_INFO.OS == DEVICE_OS.ANDROID)
        {
            AudioManager.Play(SOUND_BG_MUSIC1, true);
            AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_ACTIVE);
        }
        else
        */
        {
		  //return music to normal
		  AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_ACTIVE);
		  AudioManager.SetVolume(SOUND_BG_MUSIC2, 1);
        }
	};
	
	this.shouldCheckPress = false;
    var currentDiskRotate = 0;
    var curerntDiskDY = 0;
	this.Update = function(time)
	{
		if(isInTutorial)
		{
			if(Input.IsTouchDown() || Input.IsKeyEnterPressed())
			{
				DJ_Table.Init();

				m_shouldPlayBackGroundSound = true;
				
				isInTutorial = false;
			}
			return;
		}
		//console.log(Input.IsKeyEnterPressed());
		if(this.IsClick() || Input.IsKeyEnterPressed())
        {
        	console.log('DJ_Table IsClick (' + currentDiskRotate + ',' + this.rotate + ')');
            currentDiskRotate = this.rotate;
        }
        
		if(this.IsPress() || Input.IsKeyEnterPressed())// && !isDiskRotating)
		{
            console.log('DJ_Table IsPress');
            if(Input.IsTouchMove() || Input.IsKeyEnterPressed())
            {
            	console.log('DJ_Table IsTouchMove');
                curerntDiskDY = Input.GetDY();
            }
            this.rotate = currentDiskRotate - curerntDiskDY;
			if (curerntDiskDY != 0 || Input.IsKeyEnterPressed())
			{
				console.log('DJ_Table curerntDiskDY');
				if(MusicNoteManager.CanCheckNote())
				{
					//MusicNoteManager.SetCanCheckNote(false);
					if(MusicNoteManager.CheckNote(3))
					{
						m_score = m_score + MusicNoteManager.GetCombo();
						MusicNoteManager.PlayButtonEffect(3);
						GameCore.SetLightning(true, MusicNoteManager.GetCombo());
						if(Input.GetDY() != 0)
							MusicNoteManager.IncreaseCombo();
						else
							MusicNoteManager.ResetCombo();
						
						this.PlayPerfectSound();
					}
					else
					{
						//MusicNoteManager.PlayMissedEffect(3);
						//GameCore.SetLightning(false, 0);
					}
				}
				
				
			}
		}
		else
		{
			this.rotate ++;
		}
		
		//update button
		for(var i=0; i < 3; i++)
		{
			if(button[i].IsDJButtonClick(i) || (this.shouldCheckPress && button[i].IsDJButtonPress(i)))
			{
				if(MusicNoteManager.CheckNote(i))
				{
					if(!m_shouldPlayBackGroundSound)
					{
						this.PlayPerfectSound();
					}
					button[i].SetMissed(false);
					MusicNoteManager.PlayButtonEffect(i);

					m_score = m_score + MusicNoteManager.GetCombo();
					
					GameCore.SetLightning(true, MusicNoteManager.GetCombo());
					
					Utility.Vibrate();
				}
				else 
				{
					if(!this.shouldCheckPress)
					{
						if(!m_shouldPlayBackGroundSound)
						{
                            /*if(DEVICE_INFO.OS == DEVICE_OS.ANDROID)
                            {
                                AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_NOACTIVE);
                            }
                            else*/
                            {
				                AudioManager.SetVolume(SOUND_BG_MUSIC1, BACKGROUND_MUSIC_VOLUME_NOACTIVE);
				                AudioManager.SetVolume(SOUND_BG_MUSIC2, 1.0);
                            }
						}
						button[i].SetMissed(true);
						
						//this.PlayFailSound();
						MusicNoteManager.PlayMissedEffect(i);
						GameCore.SetLightning(false, 0);
					}
				}
			}
				
		}
		
		
		m_playerTimeCounter -= time;
		if(m_playerTimeCounter < 0)
		{
			m_playerTimeCounter = 0;
			//AudioManager.Stop(SOUND_BG_MUSIC);
			
			AudioManager.Stop(SOUND_BG_MUSIC1);
			AudioManager.Stop(SOUND_BG_MUSIC2);
			isInEndGame = true;
			GameCore.ResetLight();
			GameCore.ChangeState(GAME_STATE_GAMEOVER);
            if (this.firstTimeReward)
            {
                this.firstTimeReward = false;
                //document.location = "exit:checkreward:coins";
                //document.location = "exit:checkreward:coins:delivered:1";
                
                //ads function
                if(!DEBUG)
                {
                    //Utility.log("Debug: save the reward");
                    try
                    {
                        saveReward();
                    }catch(e)
                    {
                        Utility.log("ERROR!!!: save the reward fail: "+e.message);
                    }
                }
            }
			
			//add notifyGameComplete: ads server team request.
			try
			{
				notifyGameComplete();
			}catch(e)
			{
				Utility.log("ERROR!!!: save video_complete fail: "+e.message);
			}
		}
	};
	
	this.DJ_Draw = function() {

		if(dg_bg != null)
		{	
			dg_bg.Draw();
		}
		if(dj_disk != null)
		{
			dj_disk.Draw();
		}
		if(button != null)
		{
			button[0].Draw(0);
			button[1].Draw(1);
			button[2].Draw(2);
		}
		this.Draw();
		
		if(!isInEndGame)
		{
			this.DrawScore();
			this.DrawTime();
			this.DrawCombo();
		}
		
		
		if(this.tuto_bg != null && isInTutorial)
		{
			this.tuto_bg.Draw();
            
			//Graphic.DrawString("Be a great DJ in 40s!", Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.TITLE_POSY , "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
			//Graphic.DrawString("Tap the buttons and", Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.CONTENT_POSY -  ScreenDefine.TUTORIAL.CONTENT_LINE_SPACE, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
			//Graphic.DrawString("scratch the disc as the", Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.CONTENT_POSY , "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
			//Graphic.DrawString("notes approach you.", Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.CONTENT_POSY +  ScreenDefine.TUTORIAL.CONTENT_LINE_SPACE, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
			//Graphic.DrawString("Tap to continue", Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.TOUCH_THE_SCREEN_POSY , "#00FFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
            
            Graphic.DrawString(GetText().TUTORIAL_TITLE, Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.TITLE_POSY , "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
            //Graphic.DrawString(AudioManager.IsSupportAudioAPI()?GetText().TUTORIAL_TITLE:GetText().TUTORIAL_TITLE_40S, Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.TITLE_POSY , "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
            
            Graphic.DrawPage(tutorial_text, Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.CONTENT_POSY, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
            Graphic.DrawString(GetText().TUTORIAL_TAP, Graphic.width >> 1, this.tuto_bg.PosY() + ScreenDefine.TUTORIAL.TOUCH_THE_SCREEN_POSY , "#00FFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER);
		}
		
		
	};
	
	this.DrawScore = function() {
        if (USE_TEXT_COLOR)
		  Graphic.DrawString("" + m_score, Graphic.width + ScreenDefine.DJ_TABLE.SCORE.POSX, ScreenDefine.DJ_TABLE.SCORE.POSY, this.textColor, ScreenDefine.FONT_SIZE_MAX, RIGHT, RIGHT);
        else Graphic.DrawString("" + m_score, Graphic.width + ScreenDefine.DJ_TABLE.SCORE.POSX, ScreenDefine.DJ_TABLE.SCORE.POSY, "#FFFFFF", ScreenDefine.FONT_SIZE_MAX, RIGHT, V_CENTER);
	};
	
	this.DrawCombo = function() {
        if (USE_TEXT_COLOR)
            Graphic.DrawString('x'+(MusicNoteManager.GetCombo() - 1), Graphic.width + ScreenDefine.DJ_TABLE.COMBO.POSX, ScreenDefine.DJ_TABLE.COMBO.POSY, this.textColor, ScreenDefine.FONT_SIZE_MAX, RIGHT, RIGHT);
        else Graphic.DrawString('x'+(MusicNoteManager.GetCombo() - 1), Graphic.width + ScreenDefine.DJ_TABLE.COMBO.POSX, ScreenDefine.DJ_TABLE.COMBO.POSY, "#FFFFFF", ScreenDefine.FONT_SIZE_MAX, RIGHT, V_CENTER);
	};
	
	this.DrawTime = function() {
        if (USE_TEXT_COLOR)
        {
            //Graphic.DrawString("" + Math.floor(m_playerTimeCounter/1000), Graphic.width - ScreenDefine.DJ_TABLE.TIME.POSX, ScreenDefine.DJ_TABLE.TIME.POSY_SEC , this.textColor, ScreenDefine.FONT_SIZE_TIME, RIGHT, LEFT);
            //Graphic.DrawString(" : " + Math.round(((Math.round(m_playerTimeCounter/10)/100)%1) * 100), Graphic.width - ScreenDefine.DJ_TABLE.TIME.POSX, ScreenDefine.DJ_TABLE.TIME.POSY_MILISEC, this.textColor, ScreenDefine.FONT_SIZE_NORMAL, LEFT, LEFT);
        }
        else 
        {
		//Graphic.DrawString("" + Math.floor(m_playerTimeCounter/1000), Graphic.width - ScreenDefine.DJ_TABLE.TIME.POSX, ScreenDefine.DJ_TABLE.TIME.POSY_SEC , "#FFFFFF", ScreenDefine.FONT_SIZE_TIME, LEFT, LEFT);
		//Graphic.DrawString(" : " + Math.round(((Math.round(m_playerTimeCounter/10)/100)%1) * 100), Graphic.width - ScreenDefine.DJ_TABLE.TIME.POSX, ScreenDefine.DJ_TABLE.TIME.POSY_MILISEC, "#FFFFFF", ScreenDefine.FONT_SIZE_NORMAL, LEFT, LEFT);
        }
	};
	
	this.GetScore = function() {
		return m_score;
	};
	this.GetResult = function() {
		return (m_score < m_target)?false:true;
	}
	this.IsInTutorial = function ()
	{
		return isInTutorial;
	}
}

//inherit from "Object"
DJ_Table.prototype = new Object();
DJ_Table.prototype.constructor = DJ_Table;

var DJ_Table = new DJ_Table();