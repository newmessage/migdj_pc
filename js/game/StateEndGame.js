/**
 * hung.phamviet
 */
function StateEndGame()
{

	//end game
	var background		= null;
	var end_bg			= null;
	var end_bg_text		= null;
	var end_bg_promo	= null;
	var your_score_text	= null;
	var button_retry	= null;
	var button_getit	= null;
	
	var currency_icon	= null;
	
	var m_isEndGame = false;
	
	var m_bGotReward = false;
	
	this.LoadData = function() {
		
		button_retry = new Button(BTN_RETRY_LINK + HostImagePath() + "/button/button_retry.png", "", ScreenDefine.END_GAME.RETRY_BUTTON_OFFSET_X, Graphic.height + ScreenDefine.END_GAME.RETRY_BUTTON_OFFSET_Y);
		button_retry.SetAnchor(H_CENTER|V_CENTER);
		
		button_getit = new Button(BTN_GETIT_LINK + HostImagePath() + "/button/button_getit_"+GAME_COUNTRY.language+".png", "", Graphic.width + ScreenDefine.END_GAME.GETIT_BUTTON_OFFSET_X, Graphic.height + ScreenDefine.END_GAME.GETIT_BUTTON_OFFSET_Y);
		button_getit.SetAnchor(H_CENTER|V_CENTER);
		
		end_bg_text = new Object();
		end_bg_text.Load(END_BG_TEXT_LINK + HostImagePath() + "/bg/end_bg_text_"+GAME_COUNTRY.language+".jpg");
		end_bg_text.SetPos(Graphic.width>>1, (Graphic.height>>1) + ScreenDefine.END_GAME.BG_OFFSET_Y + ScreenDefine.END_GAME.BG_TEXT_OFFSET_Y);
		end_bg_text.SetAnchor(H_CENTER|V_CENTER);
		end_bg_text.SetScale(2, 2);
		
		end_bg = new Object();
		end_bg.Load(END_BG_LINK + HostImagePath() + "/bg/end_bg_notext.jpg");
		end_bg.SetPos(Graphic.width>>1, (Graphic.height>>1) + ScreenDefine.END_GAME.BG_OFFSET_Y);
		end_bg.SetAnchor(H_CENTER|V_CENTER);
		end_bg.SetScale(2, 2);
		
		end_bg_promo = new Object();
		end_bg_promo.Load(END_BG_PROMO_LINK + HostImagePath() + "/bg/promo_banner.png");
		end_bg_promo.SetPos((Graphic.width>>1) + ScreenDefine.END_GAME.PROMOBANNER_OFFSET_X, (Graphic.height>>1) + ScreenDefine.END_GAME.BG_OFFSET_Y + ScreenDefine.END_GAME.PROMOBANNER_OFFSET_Y);
		end_bg_promo.SetAnchor(H_CENTER|V_CENTER);
		end_bg_promo.SetScale(2, 2);
		
		currency_icon = new Object();
		currency_icon.Load(CURRENCY_ICO_LINK + HostImagePath() + "/button/currency_icon.png");
		currency_icon.SetAnchor(V_CENTER);
		currency_icon.SetScale(2, 2);
        
        //TopBar.SetPosEndState();
		
		m_bGotReward = false;
	};
	
	this.IsLoaded = function() {
        if(!AudioManager.IsSupportAudioAPI())
        {
            //save loading time for some weak device
            return true;
        }
        else return button_retry.IsLoaded() && button_getit.IsLoaded() && end_bg.IsLoaded() && currency_icon.IsLoaded();
	};
	
	this.Update = function(time)
	{      
		if(button_retry.IsRelease())
		{
			DJ_Table.Init();
			MusicNoteManager.Init();
			GameCore.ChangeState(GAME_STATE_PLAY);
			m_isEndGame = false;
			m_bGotReward = true;
		}
		
		if(button_getit.IsRelease())
		{
            //Utility.log("Redirect to page: "+GetProduceLink(GAME_COUNTRY));
            try{
                if(DEBUG)
                {
                    window.open(GetProduceLink(GAME_COUNTRY));
                }
                else
                {
                    document.location = 'link:'+GetProduceLink(GAME_COUNTRY);
                }
            }catch(e)
            {
                Utility.log("Error: "+e.message);
            }
		}
		
        //TopBar.Update();
	};
	
	this.End_Draw = function() {
		
		Graphic.FillTransparent(0.7);
		if(end_bg != null)
			end_bg.Draw();
		
		if(end_bg_text != null)
			end_bg_text.Draw();
		
		if(button_retry != null)
			button_retry.Draw();
			
		if(button_getit != null)
			button_getit.Draw();
		
		Graphic.DrawString(DJ_Table.GetScore()+GetText().GREAT_SCORE, Graphic.width >> 1, ScreenDefine.END_GAME.SCORE_Y, "#00FFFF", ScreenDefine.FONT_SIZE_NORMAL, H_CENTER|V_CENTER);
		
		if(!m_unknown_country)
		{
			if(end_bg_promo != null)
				end_bg_promo.Draw();
			Graphic.DrawString(GetText().END_SCREEN_DISCOUNT_1, ScreenDefine.END_GAME.DISCOUNT_X, ScreenDefine.END_GAME.DISCOUNT_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_DISCOUNT, V_CENTER);
			Graphic.DrawString(GetText().END_SCREEN_DISCOUNT_2, ScreenDefine.END_GAME.DISCOUNT_X, ScreenDefine.END_GAME.DISCOUNT_Y + ScreenDefine.END_GAME.DISCOUNT_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_DISCOUNT_SMALL, V_CENTER);
		}
		
		//m4verick - Remove reward in game
		/*
		if (creative_type_id == 27 || creative_type_id == '27')
		{
            if(!m_bGotReward)
            {
                Graphic.DrawString(GetText().YOU_JUST_WON, Graphic.width >> 1, ScreenDefine.END_GAME.SCORE_Y + ScreenDefine.END_GAME.FREE_CASH_OFFSET_Y, "#FFFFFF", ScreenDefine.FONT_SIZE_FREE_CASH, H_CENTER|V_CENTER);

                var textWidth = Graphic.GetTextWidth(GetText().YOU_JUST_WON, ScreenDefine.FONT_SIZE_FREE_CASH)/2;
                currency_icon.SetPos((Graphic.width>>1) + textWidth, ScreenDefine.END_GAME.SCORE_Y + ScreenDefine.END_GAME.FREE_CASH_OFFSET_Y + ScreenDefine.END_GAME.FREE_CASH_ICON_OFFSET_Y);
                //currency_icon.Draw();
            }
        }
		*/
        //TopBar.Draw();
	};
}
var StateEndGame = new StateEndGame();