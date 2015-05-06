/**
 * hung.phamviet
 */


function Button(url, url_active, x, y) {
	var img_active = new Image();
	img_active.src = url_active;
	this.Load(url);
	this.SetPos(x, y);
	
	this.Draw = function() {
		if(this.img != null)
			Graphic.Draw(this.img, this.m_x, this.m_y, this.anchor, this.rotate);
		if(img_active != null && this.IsPress())
		{
			Graphic.Draw(img_active, this.m_x, this.m_y, this.anchor, this.rotate);
		}
	};
}
//inherit from "Object"
Button.prototype = new Object();
Button.prototype.constructor = Button;