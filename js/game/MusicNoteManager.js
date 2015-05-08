/**
 * hung.phamviet
 */
function MusicNoteManager()
{
	var MAX_NOTE			= 25;
	const NOTE_SCALE_OFFSET	= 0.025;
	const GLOW_TIME_MAX 	= 300;
	const RED_TIME_MAX 		= 300;
	const MAX_SHAKE_RAD 	= 4;
	
	const TIME_TO_UPDATE_ALPHA_NOTE		=	0.1*1000;// 0.1 sec
	const TIME_TO_MOVE_LIGHT_NOTE		=	0.1*1000;// 0.1 sec
    
    var MUSIC_NOTE_TIME_OFFSET        =   0;
	
	var m_note = [];
	var img_note = [];
	var img_note_light = [];
	var img_note_light_last = [];
	var img_note_red = [];
	var img_note_glow = [];
	var img_note_bright = [];
	var img_note_invert = [];
	
	var shakelPos = 5;
	var oldPos;
	
	var m_timeCounter		= 0;
	var m_timeUpdateLight	= 0;
	var m_timeUpdateAlpha	= 0;

	var m_timeSoundBackToNormal = 0;
	const NORMAL_SOUND_TIME = 700;
	
	var m_cur_note_song = 0;
	
	var m_combo = 0;
	var m_canCheckNote = false;
	
	//button effect
	var button_effect_image = [];
	var button_effect = [];
	var button_effect_missed_image = null;
	var button_effect_missed = null;
	
    var button_effect_img_src =['button_effect_pink.png','button_effect_blue.png','button_effect_orange.png','button_effect_yellow.png'];
    
	var last_pos_x = [];
	var last_pos_y;
	
	var m_red_timer = [0,0,0,0];
	var m_glow_timer = [0,0,0,0];
    
    var m_loadedCount = 0;
	
	this.ResetCombo = function()
	{
		m_combo = 0;
	}
    
    function loaded()
    {
        m_loadedCount++;
        //Utility.log("Music note manager loaded: "+m_loadedCount);
    }
    
    this.IsLoaded = function()
    {
        return m_loadedCount >= (2 + 6*4);
    }
	
	this.Init = function()
	{
        if(USE_OPTMZ_FOR_WEAK_DEVICE)
        {
            MAX_NOTE = 15;
        }
        
		var scale,x,y;
        //load note image
		for(var i =0; i < 4; i++)
		{
			
			img_note[i] = new Image();
			img_note[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+".png";
            img_note[i].onload = loaded;
			
			img_note_light[i] = new Image();
			img_note_light[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+"_light.png";
            img_note_light[i].onload = loaded;
			
			img_note_light_last[i] = new Image();
			img_note_light_last[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+ (i<3 ? "_light02.png" : "_light.png");
            img_note_light_last[i].onload = loaded;
			
			img_note_red[i] = new Image();
			img_note_red[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+"_red.png";
            img_note_red[i].onload = loaded;
			
			img_note_glow[i] = new Image();
			img_note_glow[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+"_glow.png";
            img_note_glow[i].onload = loaded;
			///*
			img_note_bright[i] = new Image();
			img_note_bright[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+"_light.png";
            img_note_bright[i].onload = loaded;
			
			img_note_invert[i] = new Image();
			img_note_invert[i].src = NOTE_LINK + HostImagePath() + "/game/note"+(i + 1)+".png";
            img_note_invert[i].onload = loaded;
			//*/
			m_note[i] = [];
			for(var j=0; j < MAX_NOTE; j++)
			{
				scale = 1 - ((MAX_NOTE - j) * NOTE_SCALE_OFFSET);
				x = ScreenDefine.MUSIC_NOTE.POSX[i] + ScreenDefine.MUSIC_NOTE.POSX_OFFSET[i] * j * scale;
				y = ScreenDefine.MUSIC_NOTE.POSY - ((1-scale*5) * ScreenDefine.MUSIC_NOTE.NOTE_OFFSET_Y) + ((ScreenDefine.MUSIC_NOTE.NOTE_DISTANCE * j * scale) + ((MAX_NOTE - j) * 11));
				
				m_note[i][j] = new MusicNote();
				m_note[i][j].SetPos(x, y);
                if (USE_OPTMZ_FOR_WEAK_DEVICE)
                {
				    m_note[i][j].SetScaleXY(scale, scale + 0.2);
                }
                else 
                {
				    m_note[i][j].SetScaleXY(scale, scale);
                }
				
				last_pos_x[i] = x;
				last_pos_y = y;
			}
		}
        
        //button effect
		
		button_effect = [];
		for(var i = 0; i < 4; i++)
		{
            button_effect_image[i] = new Image();
            button_effect_image[i].src = BTN_EFFECT_LINK + HostImagePath() + "/button/" + button_effect_img_src[i];
            button_effect_image[i].onload = loaded;
            
			button_effect[i] = new sprite(button_effect_image[i], ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.FRAME_WIDTH, ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.FRAME_HEIGHT, 3);
			button_effect[i].SetPos(last_pos_x[i] + ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.POSX_OFFSET, last_pos_y + ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.POSY_OFFSET);
			button_effect[i].Scale = 4;
		}
		//button effect missed
		button_effect_missed_image = new Image();
		button_effect_missed_image.src = BTN_EFFECT_LINK + HostImagePath() + "/button/button_effect_missed.png";
        button_effect_missed_image.onload = loaded;
		
		button_effect_missed = [];
		for(var i = 0; i < 4; i++)
		{
			button_effect_missed[i] = new sprite(button_effect_missed_image, ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.FRAME_WIDTH, ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.FRAME_HEIGHT, 3);
			button_effect_missed[i].SetPos(last_pos_x[i] + ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.POSX_OFFSET, last_pos_y + ScreenDefine.MUSIC_NOTE.BUTTON_EFFECT.POSY_OFFSET);
			button_effect_missed[i].Scale = 4;
		}
        
        this.SetNotesAlpha();

		m_combo = 0;
		m_cur_note_song = 0;
		m_canCheckNote = false;
	};
	
	this.Reset = function() {
		m_timeCounter = 0;
		m_cur_note_song = 0;
		//m_timeToPlaySound = m_note_beat_time[m_cur_note_song] * 1000 + (TIME_TO_MOVE_LIGHT_NOTE * MAX_NOTE) - 130;
        m_timeToPlaySound = 0;
        
        MUSIC_NOTE_TIME_OFFSET        =   TIME_TO_MOVE_LIGHT_NOTE/1000 * MAX_NOTE;
        
        /*
        if(!AudioManager.IsSupportAudioAPI())
        {
            MUSIC_NOTE_TIME_OFFSET        +=  -0.9;
        }
        */
	}
	
	this.Draw = function() {
		for(var i =0; i < 4; i++)
		{
			if (m_glow_timer[i] > 0)
			{
				var randX = Utility.Rand(-MAX_SHAKE_RAD, MAX_SHAKE_RAD);
				var randY = Utility.Rand(-MAX_SHAKE_RAD, MAX_SHAKE_RAD);
				for(var j=0; j < MAX_NOTE; j++)
				{
					if(j == MAX_NOTE - 1)
					{
						if(m_glow_timer[i] > 0)
							m_note[i][j].DrawShake(img_note_glow[i], randX, randY);
                        else 
                        {
                            m_note[i][j].DrawShake(img_note[i], randX, randY);
                        }
						//else
							//m_note[i][j].DrawShake(img_note_bright[i], randX, randY);
					}
					else
					{
						if(m_note[i][j].GetLight())
							m_note[i][j].DrawShake(img_note_light[i], randX, randY);
						else
                        {
                            m_note[i][j].DrawShake(img_note[i], randX, randY);
                        }
                        /*
						if(m_note[i][j].GetLight())
							m_note[i][j].DrawShake(img_note_invert[i], randX, randY);
						else m_note[i][j].DrawShake(img_note_bright[i], randX, randY);
                        */
					}
	
				}
			}
			else 
			{
				for(var j=0; j < MAX_NOTE; j++)
				{
					if(j == MAX_NOTE - 1)
					{
						//if(m_glow_timer[i] > 0)
							//m_note[i][j].Draw(img_note_glow[i]);
						//else 
						if(m_red_timer[i] > 0)
							m_note[i][j].Draw(img_note_red[i]);
						else
							m_note[i][j].Draw(img_note_light_last[i]);
					}
					else
					{
						if(m_note[i][j].GetLight())
							m_note[i][j].Draw(img_note_light[i]);
						else if(m_note[i][j].GetRed())
							m_note[i][j].Draw(img_note_red[i]);
						else
                        {
                            m_note[i][j].Draw(img_note[i]);
                        }
					}
	
				}
			}
			button_effect[i].render();
			button_effect_missed[i].render();
		}
	};
	
	this.AddLightNote = function( col)
	{
		for(var i=0; i < MAX_NOTE; i++)
		{
			if (!m_note[col][i].GetLight())
			{
				m_note[col][i].SetLight(true);
				return;
			}
		}
	}
	
	var m_timeToPlaySound = 0;
	this.Update = function(time) {
		
		var need_update_light_note = false;

		if(m_timeCounter == m_timeToPlaySound )
		{
			DJ_Table.PlayBackgroundSound();
		}
        m_timeCounter += time;
        

		if (AudioManager.GetCurrentTimeMS(SOUND_BG_MUSIC2) != 0 && m_cur_note_song < m_note_beat_number.length)
		{
			if(m_timeCounter >= (m_note_beat_time[m_cur_note_song] - MUSIC_NOTE_TIME_OFFSET) * 1000)
			{
				this.AddLightNote(m_note_beat_number[m_cur_note_song]-1);
				
				
				//m_timeCounter = 0;
				m_cur_note_song++;
				if (m_cur_note_song >= m_note_beat_number.length)
				{
					// m_cur_note_song = 0;
					m_timeCounter = 0;
				}
			}
		}
		
		m_timeUpdateLight += time;	
		if(m_timeUpdateLight > TIME_TO_MOVE_LIGHT_NOTE)
		{
			m_timeUpdateLight = 0;
			m_canCheckNote = true;
			for(var i =0; i < 4; i++)
			{
				for(var j=MAX_NOTE - 1; j >= 0; j--)
				{
					//if(m_note[i][j].GetRedTime() > 0)
					//	m_note[i][j].UpdateRedTime(time);
					
					/*if(j >= (MAX_NOTE - 2) && (m_note[i][j].GetLight() || m_note[i][j].GetRed()))
					{
						DJ_Table.PlayBackgroundSound();
					}*/
					
					if(m_note[i][j].GetLight())
					{
						if(j < MAX_NOTE - 1)
						{
							m_note[i][j + 1].SetLight(true);
						}
						//else 
						{
							// set half light MAX_NOTE - 1 
							m_note[i][j].SetHalfLight(true);
						}
						m_note[i][j].SetLight(false);
						j++;
					}
					else if(m_note[i][j].GetRed())
					{
						m_note[i][j].SetRed(false);
						j++;
					}
					else if (m_note[i][j].GetHalfLight())
					{
						m_note[i][j].SetHalfLight(false);
						if (!m_note[i][j].AlreadyHit() && j == MAX_NOTE - 1)
						{
							this.ResetCombo();
							this.SetRedTimer(i);
							DJ_Table.PlayMissSound();
							m_timeSoundBackToNormal = NORMAL_SOUND_TIME;
						}
					}
				}
			}
			
			need_update_light_note = true;
		}
		
		//update alpha
		m_timeUpdateAlpha += time;
		if(m_timeUpdateAlpha > TIME_TO_UPDATE_ALPHA_NOTE)
		{
			m_timeUpdateAlpha = 0;
			for(var i =0; i < 4; i++)
			{
				var rand = Utility.Rand(0, 10);
				var alpha_step = 0.1;
				for(var j=0; j < MAX_NOTE; j++)
				{
					if(j <= rand)
					{
						if (m_note[i][j].GetLight())
						{
							m_note[i][j].SetAlpha(1.0);
						}
						else	
						{
							m_note[i][j].SetAlpha(alpha_step);
	
						}
					}
					else
					{
						if (m_note[i][j].GetLight())
						{
							m_note[i][j].SetAlpha(1.0);
						}
						else
						{
							if(alpha_step < 0.5)
								alpha_step += 0.1;
							else alpha_step = 1;
							m_note[i][j].SetAlpha(alpha_step);
						}
					}
				}
			}
			
			need_update_light_note = true;
		}
		
		if(need_update_light_note)
		{
			for(var i =0; i < 4; i++)
			{
				for(var j=0; j < MAX_NOTE; j++)
				{
					if (m_note[i][j].GetLight())
					{
						if(j - 2 > 0 && m_note[i][j - 2].GetAlpha() < 0.4)m_note[i][j - 2].SetAlpha(0.4);
						if(j - 1 > 0 && m_note[i][j - 1].GetAlpha() < 0.6)m_note[i][j - 1].SetAlpha(0.6);
						
						if(j + 1 < MAX_NOTE && m_note[i][j + 1].GetAlpha() < 0.6)m_note[i][j + 1].SetAlpha(0.6);
						if(j + 2 < MAX_NOTE && m_note[i][j + 2].GetAlpha() < 0.4)m_note[i][j + 2].SetAlpha(0.4);
					}
				}
			}
		}
		
		for(var i = 0; i < 4; i++)
		{
			if(m_red_timer[i] > 0)
			{
				m_red_timer[i] -= time;
			}
			if(m_glow_timer[i] > 0)
			{
				m_glow_timer[i] -= time;
			}
		}
		
		if(m_timeSoundBackToNormal > 0)
		{
			m_timeSoundBackToNormal -= time;
			if(m_timeSoundBackToNormal <= 0)
			{
				DJ_Table.PlayPerfectSound();
			}
		}
	};
	
	this.SetNotesAlpha = function()
	{
		for(var i =0; i < 4; i++)
		{
			var rand = Utility.Rand(0, 10);
			var alpha_step = 0.1;
			for(var j=0; j < MAX_NOTE; j++)
			{
				if(j <= rand)
				{
					if (m_note[i][j].GetLight())
					{
						m_note[i][j].SetAlpha(1.0);
					}
					else	
					{
						m_note[i][j].SetAlpha(alpha_step);

					}
				}
				else
				{
					if (m_note[i][j].GetLight())
					{
						m_note[i][j].SetAlpha(1.0);
					}
					else
					{
						if(alpha_step < 0.5)
							alpha_step += 0.1;
						else alpha_step = 1;
						m_note[i][j].SetAlpha(alpha_step);
					}
				}
			}
		}
	}
	
	this.CheckNote = function(index) {
		
		if(!m_canCheckNote)
			return;
		m_canCheckNote = false;
		
		if(index < 3)
		{
			for(var i = MAX_NOTE -1; i > MAX_NOTE - 3; i-- )
			{
				if( ( m_note[index][i].GetLight() || m_note[index][i].GetHalfLight() ) && !m_note[index][i].AlreadyHit())
				{
					m_combo++;
					m_note[index][i].SetHit(true);
					m_note[index][i].SetLight(false);
					this.SetGlowTimer(index);
					
					if(m_note[index][i-1].GetLight())
					{
						DJ_Table.shouldCheckPress = true;
					}
					else DJ_Table.shouldCheckPress = false;
					
					//DJ_Table.PlayBackgroundSound();
					
					return true;
				}
			}
			
			//remove node when missed
			for(var i = MAX_NOTE -3; i > 0; i-- )
			{
				if(m_note[index][i].GetRed())
				{
					//no need to remove note
					return;
				}
				if(m_note[index][i].GetLight())
				{
					///*
					this.ResetCombo();
					this.SetRedTimer(index);
					m_note[index][i].SetLight(false);
					m_note[index][i].SetRed(true);
					//m_note[index][i-1].SetHalfLight(false);
					m_note[index][i].SetRedTime();
					DJ_Table.PlayFailSound();
					m_timeSoundBackToNormal = NORMAL_SOUND_TIME;
					//*/
					return;
				}
				
				//should play fail sound when nolight note
				if(i == 1)
				{
					DJ_Table.PlayFailSound();
					m_timeSoundBackToNormal = NORMAL_SOUND_TIME;
				}
			}
			
			
		}
		else
		{
			if((m_note[index][MAX_NOTE - 1].GetLight() || m_note[index][MAX_NOTE - 1].GetHalfLight()) && !m_note[index][MAX_NOTE - 1].AlreadyHit())
			{
				this.SetGlowTimer(index);
				m_note[index][MAX_NOTE - 1].SetHit(true);
				return true;
			}
		}
		return false;
	}
	
	this.CheckNoteNoChange = function(index) {
		for(var i = MAX_NOTE -1; i > MAX_NOTE - 3; i-- )
		{
			if(m_note[index][i].GetLight())
			{
				return true;
			}
		}
		return false;
	}
	
	this.IncreaseCombo = function()
	{
		m_combo++;
	}
	
	this.GetCombo = function()
	{
		return (m_combo>1 ? m_combo:1);
	}
	
	this.PlayButtonEffect = function(index)
	{
		button_effect[index].Play();
	}
	this.PlayMissedEffect = function(index)
	{
		button_effect_missed[index].Play();
		this.SetRedTimer(index);
	}
	
	this.SetCanCheckNote = function(value)
	{
		m_canCheckNote = value;
	}
	
	this.CanCheckNote = function()
	{
		return m_canCheckNote;
	}
	
	this.SetGlowTimer = function(index)
	{
		m_glow_timer[index] = GLOW_TIME_MAX;
	}
	
	this.SetRedTimer = function(index)
	{
		m_red_timer[index] = RED_TIME_MAX;
	}
}

var MusicNoteManager = new MusicNoteManager();
//MusicNoteManager.Init();