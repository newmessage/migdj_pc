/**
 * 
 */

function TopBar()
{
	this.width = 0;
	this.height = 0;
	
	var m_button = null;
	
	this.Init = function() {
	
		m_button = new Object();
		m_button.Load(TOPBAR_CLOSE_BTN_LINK + HostImagePath() + "/topBar/close_button.png");
		m_button.SetPos(Graphic.width + ScreenDefine.TOP_BAR.BUTTON.POSX_PRELOAD, Graphic.height + ScreenDefine.TOP_BAR.BUTTON.POSY_PRELOAD);
		m_button.SetAnchor(H_CENTER|V_CENTER);
		m_button.SetScale(1, 1);
		
		//get size
		this.width = ScreenDefine.TOP_BAR.WIDTH;
		this.height = ScreenDefine.TOP_BAR.HEIGHT;
		
		Utility.log("Top bar size ("+ this.width +", "+this.height+")");
	};
    
    this.SetPosEndState = function()
    {
		m_button.SetPos(Graphic.width + ScreenDefine.TOP_BAR.BUTTON.POSX, ScreenDefine.TOP_BAR.BUTTON.POSY);
		m_button.SetAnchor(H_CENTER|V_CENTER);
    }
    
    this.IsLoaded = function()
    {
        return m_button != null && m_button.IsLoaded();
    };
	
	this.Draw = function()
	{
        if(this.IsLoaded())
        {
		  m_button.Draw();
        }
	};
	
	this.Update = function() {
        if(this.IsLoaded())
        {
            if(!DEBUG)
            {
                if(m_button.IsClick())
                {
                    
                    //Utility.log("Debug: notify the game to check reward");
                    try{
                        redirect('exit:');
                    }catch(e)
                    {
                        Utility.log("ERROR!!!: save the reward fail: "+e.message);
                    }
                }
            }
        }
	};
}

var TopBar = new TopBar();