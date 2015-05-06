/**
 * hung.phamviet
 */

function MusicNote()
{
	var m_x = 0;
	var m_y = 0;
	
	var m_speed = 10;
	var m_scale = 1;
	var m_scaleX = 1;
    var m_scaleY = 1;
    
	var m_isLight = false;
	var m_isHalfLight = false;
	var m_isRed = false;
	var m_alpha = 1;
	
	var m_isHit = false;
	
	const RED_TIME = 300;
	var m_redTimer = 0;
	
	this.SetSpeed = function(speed) {
		m_speed = speed;
	};
	
	this.SetPos = function(x, y) {
		m_x = x;
		m_y = y;
	};
	
	this.SetScale = function(value) {
		m_scale = value;
	};
	
	this.SetScaleXY = function(valueX, valueY) {
		m_scaleX = valueX;
        m_scaleY = valueY;
	};
	
	this.Update = function() {
		m_y += speed;
	};
	
	this.Draw = function(img) {
		Graphic.Draw(img, m_x, m_y, H_CENTER | V_CENTER, 0, m_scaleX, m_scaleY, m_alpha);
	};
	
	this.DrawShake = function(img, randX, randY) {
		//Graphic.Draw(img, m_x + randX, m_y + randY, H_CENTER | V_CENTER, 0, m_scale, m_scale, m_alpha);
		Graphic.Draw(img, m_x, m_y, H_CENTER | V_CENTER, 0, m_scaleX, m_scaleY, m_alpha);
	};
	
	this.SetLight = function(value) {
		m_isLight = value;
		if(value)
		{
			m_isHit = false;
			m_isRed = false;
			m_isHalfLight = false;
		}
		//else m_isHit = false;
	};
	
	this.SetHalfLight = function(value)
	{
		m_isHalfLight = value;
	}
	
	this.GetHalfLight = function(value)
	{
		return m_isHalfLight;
	}
	
	this.GetLight = function() {
		return m_isLight;
	};
	
	this.SetRed = function(value) {
		m_isRed = value;
		if(value)
		{
			m_isLight = false;
			m_isHalfLight = false;
		}
	};
	
	this.GetRed = function() {
		return m_isRed;
	};
	
	this.AlreadyHit = function() {
		return m_isHit;
	};
	
	this.SetHit = function(value) {
		m_isHit = value;
	};
	
	this.SetAlpha = function(value) {
		m_alpha = value;
	};
	
	this.GetAlpha = function() {
		return m_alpha;
	};
	
	this.SetRedTime = function() {
		m_redTimer = RED_TIME;
	};
	
	this.GetRedTime = function()
	{
		return m_redTimer;
	}
	
	this.UpdateRedTime = function(value) {
		if(m_redTimer > value)
			m_redTimer -= value;
		else
			m_isRed = false;
	};
}