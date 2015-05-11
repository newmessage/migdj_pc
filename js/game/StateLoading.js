/**
 * hung.phamviet
 */
function StateLoading()
{  
    const LOAD_NONE             =   0;
    const LOAD_INGAME_SCRIPT    =   1;
    const LOAD_SOUND            =   2;
    const LOAD_TOPBAR           =   3;
    const LOAD_BACKGROUND       =   4;
    const LOAD_MUSIC_NOTE       =   5;
    const LOAD_DJ               =   6;
    const LOAD_STATE_ENDGAME    =   7;
    const LOAD_FINISH           =   8;
    
    var m_step = LOAD_NONE;
	var loading_bg = null;
    var loading_logo = null;
	
	var main_bg = null;
	
	const NUM_DISKS = 8;
	var loading_disk = null;
	
	const index_time = 200;
	
	this.LoadData = function() {
	
		loading_bg = new Object();
		loading_bg.Load(LOADING_BG_LINK + HostImagePath() + "/bg/loading_bg.jpg");
        loading_bg.SetPos(Graphic.width >> 1, ScreenDefine.LOADING.BACKGROUND.POSY);
		loading_bg.SetAnchor(H_CENTER|V_CENTER);
		loading_bg.SetScale(2, 2);
		
		main_bg = new Object();
		main_bg.Load(BACKGROUND_LINK + HostImagePath() + "/bg/Loading.jpg");
		main_bg.SetScale(1.5, 1.5);
		//main_bg.SetPos(Graphic.width>>1, ScreenDefine.TUTORIAL.POSY);
		main_bg.SetPos(Graphic.width>>1, ScreenDefine.TUTORIAL.POSY+100);
		main_bg.SetAnchor(H_CENTER|V_CENTER);
        
        loading_logo = new Object();
        loading_logo.Load(LOADING_LOGO_LINK + HostImagePath() + "/bg/dg_control_air_logo.jpg");
        loading_logo.SetPos(Graphic.width >> 1, ScreenDefine.LOADING.BACKGROUND.LOGOY);
		loading_logo.SetAnchor(H_CENTER|V_CENTER);
		
        loading_disk = new Object();
        loading_disk.Load(LOADING_DISC_LINK + HostImagePath() + "/button/disk.png");
        loading_disk.SetPos(Graphic.width, (Graphic.height>>1) + ScreenDefine.LOADING.BG_OFFSET_Y);
        loading_disk.SetScale(0.7,0.7);
        loading_disk.SetAnchor(H_CENTER|V_CENTER);
        loading_disk.SetRotate(360/NUM_DISKS);

		// loading_disk = [];
		// for(var i=0; i < NUM_DISKS; i++)
		// {
		// 	loading_disk[i] = new Object();
		// 	loading_disk[i].Load(LOADING_DISC_LINK + HostImagePath() + "/button/disk.png");
		// 	loading_disk[i].SetPos(Graphic.width, (Graphic.height>>1) + ScreenDefine.LOADING.BG_OFFSET_Y);
		// 	loading_disk[i].SetAnchor(H_CENTER|V_CENTER);
		// 	loading_disk[i].SetRotate(i*360/NUM_DISKS);
		// }

        
	};
	
	this.Init = function() {
        this.LoadData();
	};
    
    this.IsLoaded = function()
    {
        return loading_bg.IsLoaded() && loading_logo.IsLoaded() && main_bg.IsLoaded();
    }

    var spinning_disk_speed = 0;
	
	this.Update = function(time)
	{
        //update state
        switch(m_step)
        {
            case LOAD_NONE:
                //load game script
                ScriptManager.Load(InGameScriptFile);
                m_step = LOAD_INGAME_SCRIPT;
            break;
            case LOAD_INGAME_SCRIPT:
                if(scriptLoaded)
                {
                    //TopBar.Init();
                    //m_step = LOAD_TOPBAR;
                    
                    m_step = LOAD_SOUND
                }
             break;
            case LOAD_SOUND:
                if(AudioManager.IsLoaded(time))
                {
                    GameCore.LoadBackGround();
                    m_step = LOAD_BACKGROUND;
                }
            break;
            /*
            case LOAD_TOPBAR:
                if(TopBar.IsLoaded())
                {
                    GameCore.LoadBackGround();
                    m_step = LOAD_BACKGROUND;
                }
            break;
            */
            case LOAD_BACKGROUND:
                if(GameCore.IsFinishLoadBG())
                {
                    MusicNoteManager.Init();
                    m_step = LOAD_MUSIC_NOTE;
                }
            break;
            case LOAD_MUSIC_NOTE:
                if(MusicNoteManager.IsLoaded())
                {
                    DJ_Table.LoadData();
                    m_step = LOAD_DJ;
                }
               
            break;
            case LOAD_DJ:
                if(DJ_Table.Loaded())
                {
                    StateEndGame.LoadData();
                    m_step = LOAD_STATE_ENDGAME;
                }
            break;
            
            case LOAD_STATE_ENDGAME:
                if(StateEndGame.IsLoaded())
                {
                    //AudioManager.Load();
                    m_step = LOAD_FINISH;
                }
            break;
            
            case LOAD_FINISH:
                GameCore.ChangeState(GAME_STATE_PLAY);
            break;
        }
        
        //Utility.log("Current loading step: "+m_step);
        //SetLog("Current loading step: "+m_step);
        spinning_disk_speed+=20;
        loading_disk.SetRotate(spinning_disk_speed);
        
	};
	
	this.Draw = function() {

		if(main_bg != null)
			main_bg.Draw();
		
		/*	
		if(loading_bg != null)
			loading_bg.Draw();
        
        if(loading_logo != null)
            loading_logo.Draw();
		*/
		
		//for(var i=0; i < (m_step*LOAD_FINISH/NUM_DISKS); i++)
		{
			//loading_disk[i].Draw();
            loading_disk.Draw();
		}
		
		Graphic.DrawString(GetText().LOADING, Graphic.width, (Graphic.height>> 1) + ScreenDefine.LOADING.TEXT_OFFSET_Y , "#00FFFF", ScreenDefine.FONT_SIZE_MAX, H_CENTER);
	};
	
	this.DrawLoadingBar = function(percent, posx, offset_Y)
	{
		if(percent > 100) return;
        
        var ctx = Graphic.GetContext();
        
		var cur_percent = percent * ScreenDefine.LOADING.BAR.MAX_NOTE / 100;
		var current_pos = 0;
        
	   var LOADING_NODE_SPACE = ScreenDefine.LOADING.BAR.NOTE_WIDTH + ScreenDefine.LOADING.BAR.OFFSET;
        
        posx -= (LOADING_NODE_SPACE * ScreenDefine.LOADING.BAR.MAX_NOTE)/2 - Graphic.GetOffsetRatio();

		while(current_pos < cur_percent-1)
		{
			ctx.fillStyle = 'cyan';
			ctx.fillRect(current_pos*LOADING_NODE_SPACE + posx, offset_Y + (Graphic.height>>1), ScreenDefine.LOADING.BAR.NOTE_WIDTH, ScreenDefine.LOADING.BAR.HEIGHT);
			current_pos++;
		}
		
		ctx.fillStyle = 'white';
		ctx.fillRect(current_pos*LOADING_NODE_SPACE + posx, offset_Y + (Graphic.height>>1), ScreenDefine.LOADING.BAR.NOTE_WIDTH, ScreenDefine.LOADING.BAR.HEIGHT);
		current_pos++;
		
		while(current_pos < ScreenDefine.LOADING.BAR.MAX_NOTE)
		{
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'cyan';
			ctx.rect(current_pos*LOADING_NODE_SPACE + posx+1, offset_Y + (Graphic.height>>1)+1, ScreenDefine.LOADING.BAR.NOTE_WIDTH-2, ScreenDefine.LOADING.BAR.HEIGHT-2);
			ctx.stroke();
			current_pos++;
		}
	}
}

var StateLoading = new StateLoading();