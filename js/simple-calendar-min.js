!function(D,t,e,a){"use strict";var n="simpleCalendar",r={months:["january","february","march","april","may","june","july","august","september","october","november","december"],days:["saturday","sunday","monday","tuesday","wenesday","thursday","friday"],minDate:"YYYY-MM-DD",maxDate:"YYYY-MM-DD",fixedStartDay:!0,insertEvent:!0,displayEvent:!0,event:[],insertCallback:function(){}};function d(t,e){this.element=t,this.settings=D.extend({},r,e),this._defaults=r,this._name=n,this.currentDate=new Date,this.init()}D.extend(d.prototype,{init:function(){var t=D(this.element),e=this.currentDate,a=D('<div class="calendar"></div>'),n=D('<header><h5 class="month"></h5><a class="btn btn-prev" href="#"><</a><a class="btn btn-next" href="#">></a></header>');this.updateHeader(e,n),a.append(n),this.buildCalendar(e,a),t.append(a),this.bindEvents()},updateHeader:function(t,e){var a=t.getFullYear();e.find(".month").html("<span>"+this.settings.months[t.getMonth()]+"</span><small> "+a+"</small>")},buildCalendar:function(t,e){e.find("table").remove();for(var a=D("<table></table>"),n=D("<thead></thead>"),r=D("<tbody></tbody>"),d=0;d<this.settings.days.length;d++)n.append(D("<td>"+this.settings.days[d%7].substring(0,3)+"</td>"));for(var s=t.getFullYear(),i=t.getMonth(),u=new Date(s,i,1);6!=u.getDay();)u.setDate(u.getDate()-1);for(var h=new Date(s,i+1,0);5!=h.getDay();)h.setDate(h.getDate()+1);for(var l=u;l<=h;l.setDate(l.getDate())){var o=D("<tr></tr>");for(d=0;d<7;d++){var c=D('<td><a href="#" class="day">'+l.getDate()+"</a></td>");l.toDateString()===(new Date).toDateString()&&c.find(".day").addClass("today"),l.getMonth()!=t.getMonth()&&c.find(".day").addClass("wrong-month"),o.append(c),l.setDate(l.getDate()+1)}r.append(o)}a.append(n),a.append(r),e.append(a)},bindEvents:function(){var t=this;D(".btn-prev").click(function(){t.currentDate.setMonth(t.currentDate.getMonth()-1),t.buildCalendar(t.currentDate,D(".calendar")),t.updateHeader(t.currentDate,D(".calendar header"))}),D(".btn-next").click(function(){t.currentDate.setMonth(t.currentDate.getMonth()+1),t.buildCalendar(t.currentDate,D(".calendar")),t.updateHeader(t.currentDate,D(".calendar header"))})}}),D.fn[n]=function(t){return this.each(function(){D.data(this,"plugin_"+n)||D.data(this,"plugin_"+n,new d(this,t))})}}(jQuery,window,document);