/**
 * hung.phamviet
 */


function DJButton(id, url, url_active, url_miss, x, y) {
	var index = id;
	var img_active = new Image();
	var img_miss = new Image();
    
	img_active.src = url_active;
    img_active.onload = load;
	img_miss.src = url_miss;
    img_miss.onload = load;
	
	var isMissed = false;
    
    var m_loadCount = 0;
	
	this.Load(url);
	this.SetPos(x, y);
    
    function load()
    {
        m_loadCount++;
    }
    
    this.Loaded = function()
    {
        return this.loaded() && (m_loadCount == 2)
    }
	
	this.Draw = function() {
		if(this.IsDJButtonPress())
		{
			if(isMissed)
				Graphic.Draw(img_miss, this.m_x, this.m_y, this.anchor, this.rotate);
			else
				Graphic.Draw(img_active, this.m_x, this.m_y, this.anchor, this.rotate);
		}
		else
		{
			Graphic.Draw(this.img, this.m_x, this.m_y, this.anchor, this.rotate);
		}
	};
	
	this.SetMissed = function(value)
	{
		isMissed = value;
	}
	
	this.IsDJButtonClick = function() {
		if(Input.IsTouchDown())
		{
			var x = this.m_x;
			var y = this.m_y;
			if((this.anchor & H_CENTER) != 0)
				x = x - (this.img.width >> 1);
			if((this.anchor & V_CENTER) != 0)
				y = y - (this.img.height >> 1);

			return Input.IsTouchInBounce(x, y,  this.img.width,  this.img.height+ScreenDefine.DJ_TABLE.BUTTON.TOUCH_OFFSET);
		}
		return false;
	};
	
	this.IsDJButtonRelease = function() {
		if(Input.IsTouchUp())
		{
			var x = this.m_x;
			var y = this.m_y;
			if((this.anchor & H_CENTER) != 0)
				x = x - (this.img.width >> 1);
			if((this.anchor & V_CENTER) != 0)
				y = y - (this.img.height >> 1);

			return Input.IsTouchInBounce(x, y,  this.img.width,  this.img.height+ScreenDefine.DJ_TABLE.BUTTON.TOUCH_OFFSET);
		}
		return false;
	};
	
	this.IsDJButtonPress = function() {
		if(Input.IsTouchPress())
		{
			var x = this.m_x;
			var y = this.m_y;
			if((this.anchor & H_CENTER) != 0)
				x = x - (this.img.width >> 1);
			if((this.anchor & V_CENTER) != 0)
				y = y - (this.img.height >> 1);

			return Input.IsTouchInBounce(x, y,  this.img.width,  this.img.height+ScreenDefine.DJ_TABLE.BUTTON.TOUCH_OFFSET);
		}
		return false;
	};
}
//inherit from "Object"
DJButton.prototype = new Object();
DJButton.prototype.constructor = DJButton;