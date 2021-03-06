/*
* EaselJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2011 gskinner.com, inc.
* 
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*/
(function(d){var c=function(b,a,c,e){this.initialize(b,a,c,e)},a=c.prototype=new Container;c.INDEPENDENT="independent";c.SINGLE_FRAME="single";c.SYNCHED="synched";a.startPosition=0;a.loop=true;a.timeline=null;a.paused=false;a._synchOffset=0;a._prevPos=-1;a._prevPosition=0;a.Container_initialize=a.initialize;a.initialize=function(b,a,g,e){this.mode=b||c.INDEPENDENT;this.startPosition=a||0;this.loop=g;props={paused:true,position:a,useTicks:true};this.Container_initialize();this.timeline=new Timeline(null,
e,props);this._managed={}};a.isVisible=function(){return this.visible&&this.alpha>0&&this.scaleX!=0&&this.scaleY!=0};a.Container_draw=a.draw;a.draw=function(b,a,c){if(this.DisplayObject_draw(b,a))return true;this._updateTimeline();this.Container_draw(b,a,c)};a.play=function(){this.paused=false};a.stop=function(){this.paused=true};a.gotoAndPlay=function(b){this.paused=false;this._goto(b)};a.gotoAndStop=function(b){this.paused=true;this._goto(b)};a.clone=function(){throw"MovieClip cannot be cloned.";
};a.toString=function(){return"[MovieClip (name="+this.name+")]"};a.Container__tick=a._tick;a._tick=function(){if(!this.paused&&this.mode==c.INDEPENDENT)this._prevPosition=this._prevPos<0?0:this._prevPosition+1;this.Container__tick()};a._goto=function(b){b=this.timeline.resolve(b);if(b!=null)this._prevPosition=b,this._updateTimeline()};a._reset=function(){this._prevPos=-1};a._updateTimeline=function(){var b=this.timeline,a=b._tweens,g=this.children,e=this.mode!=c.INDEPENDENT;b.loop=this.loop==null?
true:this.loop;e?b.setPosition(this.startPosition+(this.mode==c.SINGLE_FRAME?0:this._synchOffset),Tween.NONE):b.setPosition(this._prevPosition);this._prevPosition=b._prevPosition;if(this._prevPos!=b._prevPos){this._prevPos=b._prevPos;for(var f in this._managed)this._managed[f]=1;for(b=a.length-1;b>=0;b--)if(f=a[b],e=f._target,e!=this)f=f._stepPosition,e instanceof DisplayObject?this._addManagedChild(e,f):this._setState(e.state,f);for(b=g.length-1;b>=0;b--)a=g[b].id,this._managed[a]==1&&(this.removeChildAt(b),
delete this._managed[a])}};a._setState=function(b,a){if(b)for(var c=0,e=b.length;c<e;c++){var f=b[c],d=f.t,f=f.p,h;for(h in f)d[h]=f[h];this._addManagedChild(d,a)}};a._addManagedChild=function(a,d){if(!a._off){this.addChild(a);if(a instanceof c)a._synchOffset=d,a.mode==c.INDEPENDENT&&(!this._managed[a.id]||this._prevPos==0)&&a._reset();this._managed[a.id]=2}};d.MovieClip=c})(window);
(function(){var d=function(){throw"MovieClipPlugin cannot be instantiated.";};d.priority=100;d.install=function(){Tween.installPlugin(d,["startPosition"])};d.init=function(c,a,b){if(a=="startPosition"||!(c._target instanceof MovieClip))return b};d.tween=function(c,a,b,d,g,e){return!(c._target instanceof MovieClip)?b:e==1?g[a]:d[a]};d.install()})();