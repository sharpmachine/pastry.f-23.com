/*!
 * jQuery Lifestream Plug-in
 * @version 0.3.1
 * Show a stream of your online activity
 *
 * Copyright 2011, Christian Vuerings - http://denbuzze.com
 *//*globals jQuery, $ */(function(e){"use strict";String.prototype.capitalize=function(){var e=this.replace("_page","");return e.charAt(0).toUpperCase()+e.slice(1)};String.prototype.trunc=function(e){return this.substr(0,e-1)+(this.length>e?"&hellip;":"")};e.fn.lifestream=function(t){return this.each(function(){var n=e(this),r=jQuery.extend({classname:"lifestream",feedloaded:null,limit:3,list:[]},t),i={count:r.list.length,items:[]},s=jQuery.extend(!0,{},r),o=function(t){e.merge(i.items,t);i.items.sort(function(e,t){return t.date-e.date});var s=i.items,o=s.length<r.limit?s.length:r.limit,u=0,a,f=e('<ul class="'+r.classname+'"/>');for(;u<o;u++){a=s[u];a.html&&e('<li class="'+r.classname+"-"+a.config.service+'">').append(a.html).append("<div id='date-social'><span class=\"ago-social\">"+jQuery.timeago(a.date)+'</span><span class="on-social"><a href='+a.url+">"+a.config.service.capitalize()+"</a></span></div").appendTo(f)}n.html(f);e.isFunction(r.feedloaded)&&r.feedloaded()},u=function(){var t=0,n=r.list.length;delete s.list;for(;t<n;t++){var i=r.list[t];if(e.fn.lifestream.feeds[i.service]&&e.isFunction(e.fn.lifestream.feeds[i.service])&&i.user){i._settings=s;e.fn.lifestream.feeds[i.service](i,o)}}};jQuery.tmpl?u():jQuery.getScript("http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js",u)})};e.fn.lifestream.createYqlUrl=function(e){return"http://query.yahooapis.com/v1/public/yql?q=__QUERY__&env=store://datatables.org/alltableswithkeys&format=json".replace("__QUERY__",encodeURIComponent(e))};e.fn.lifestream.feeds=e.fn.lifestream.feeds||{};Object.keys||(Object.keys=function(e){if(e!==Object(e))throw new TypeError("Object.keys called on non-object");var t=[],n;for(n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t})})(jQuery);(function(e){e.fn.lifestream.feeds.bitbucket=function(t,n){var r=e.extend({},{commit:'<a href="http://bitbucket.org/${owner}/${name}/changeset/${node}/">committed</a> at <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>',pullrequest_fulfilled:'fulfilled a pull request at <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>',pullrequest_rejected:'rejected a pull request at <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>',pullrequest_created:'created a pull request at <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>',create:'created a new project at <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>',fork:'forked <a href="http://bitbucket.org/${owner}/${name}/">${owner}/${name}</a>'},t.template),i=["commit","pullrequest_fulfilled","pullrequest_rejected","pullrequest_created","create","fork"],s=function(t){if(e.inArray(t.event,i)!==-1&&t.repository)return t.event==="commit"?e.tmpl(r.commit,{owner:t.repository.owner,name:t.repository.name,node:t.node}):e.tmpl(r[t.event],{owner:t.repository.owner,name:t.repository.name})},o=function(n){var r=[],i=0;n.query&&n.query.count&&n.query.count>0&&e.each(n.query.results.json,function(){r.push({date:new Date(this.events.created_on.replace(/-/g,"/")),config:t,html:s(this.events)})});return r};e.ajax({url:e.fn.lifestream.createYqlUrl('select events.event,events.node, events.created_on,events.repository.name, events.repository.owner from json where url = "https://api.bitbucket.org/1.0/users/'+t.user+'/events/"'),dataType:"jsonp",success:function(e){n(o(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.bitly=function(t,n){var r=e.extend({},{created:'created URL <a href="${short_url}" title="${title}">${short_url}</a>'},t.template);e.ajax({url:e.fn.lifestream.createYqlUrl('select data.short_url, data.created, data.title from json where url="http://bitly.com/u/'+t.user+'.json"'),dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i.query&&i.query.count&&i.query.results.json){list=i.query.results.json;u=list.length;for(;o<u;o++){var a=list[o].data;s.push({date:new Date(a.created*1e3),config:t,html:e.tmpl(r.created,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.blogger=function(t,n){var r=e.extend({},{posted:'posted <a href="${origLink}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a,f,l;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.feed.entry){s=n.query.results.feed.entry;u=s.length;for(;o<u;o++){a=s[o];if(!a.origLink){f=0;l=a.link.length;for(;f<l;f++)a.link[f].rel==="alternate"&&(a.origLink=a.link[f].href)}if(a.origLink){a.title.content&&(a.title=a.title.content);i.push({date:new Date(a.published),config:t,html:e.tmpl(r.posted,a)})}}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://'+t.user+'.blogspot.com/feeds/posts/default"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.citeulike=function(t,n){var r=e.extend({},{saved:'saved <a href="${href}">${title}</a> by ${authors}'},t.template),i=function(n){var i=[],s=0,o;if(n&&n.length&&n.length>0){o=n.length;for(;s<o;s++){var u=n[s];i.push({date:new Date(u.date),config:t,url:"http://www.citeulike.org/user/"+t.user,html:e.tmpl(r.saved,u)})}}return i};e.ajax({url:"http://www.citeulike.org/json/user/"+t.user,dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.dailymotion=function(t,n){var r=e.extend({},{uploaded:'uploaded a video <a href="${link}">${title[0]}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.uploaded,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://www.dailymotion.com/rss/user/'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.delicious=function(t,n){var r=e.extend({},{bookmarked:'bookmarked <a href="${u}">${d}</a>'},t.template);e.ajax({url:"http://feeds.delicious.com/v2/json/"+t.user,dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i&&i.length&&i.length>0){u=i.length;for(;o<u;o++){var a=i[o];s.push({date:new Date(a.dt),config:t,html:e.tmpl(r.bookmarked,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.deviantart=function(t,n){var r=e.extend({},{posted:'posted <a href="${link}">${title}</a>'},t.template);e.ajax({url:e.fn.lifestream.createYqlUrl('select title,link,pubDate from rss where url="http://backend.deviantart.com/rss.xml?q=gallery%3A'+encodeURIComponent(t.user)+"&type=deviation"+'" | unique(field="title")'),dataType:"jsonp",success:function(i){var s=[],o,u,a=0,f;if(i.query&&i.query.count>0){o=i.query.results.item;f=o.length;for(;a<f;a++){u=o[a];s.push({date:new Date(u.pubDate),config:t,html:e.tmpl(r.posted,u)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.digg=function(t,n){var r=e.extend({},{comment:'commented on <a href="${url}" title="${title}">${title}</a>',digg:'dugg <a href="${url}" title="${title}">${title}</a>',submission:'submitted <a href="${url}" title="${title}">${title}</a>'},t.template);e.ajax({url:"http://services.digg.com/2.0/user.getActivity?username="+t.user+"&type=javascript",dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i&&i.stories){u=i.stories.length;for(;o<u;o++){var a=i.stories[o],f=a.activity.length;for(l=0;l<f;l++){var c;a.activity[l]==="submission"||a.promote_date===null?c=a.date_created:c=a.promote_date;s.push({date:new Date(c*1e3),config:t,html:e.tmpl(r[a.activity[l]],a)})}}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.dribbble=function(t,n){var r=e.extend({},{posted:'posted a shot <a href="${url}">${title}</a>'},t.template);e.ajax({url:"http://api.dribbble.com/players/"+t.user+"/shots",dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i&&i.total){u=i.shots.length;for(;o<u;o++){var a=i.shots[o];s.push({date:new Date(a.created_at),config:t,html:e.tmpl(r.posted,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.facebook_page=function(t,n){var r=e.extend({},{wall_post:"${description}"},t.template),i=function(n){var r=[],i,o=0,u;if(n.query&&n.query.count&&n.query.count>0){i=n.query.results.rss.channel.item;u=i.length;for(o;o<u;o++){var a=i[o];if(e.trim(a.title)){a.description=s(a.description).trunc(200);r.push({date:new Date(a.pubDate),config:t,html:a.description,url:a.link})}}}return r},s=function(e){var t=document.createElement("DIV");t.innerHTML=e;return t.textContent||t.innerText};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="www.facebook.com/feeds/page.php?id='+t.user+'&format=rss20"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.flickr=function(t,n){var r=e.extend({},{posted:'posted a photo <a href="${link}">${title}</a>'},t.template);e.ajax({url:"http://api.flickr.com/services/feeds/photos_public.gne?id="+t.user+"&lang=en-us&format=json",dataType:"jsonp",jsonp:"jsoncallback",success:function(i){var s=[],o=0,u;if(i&&i.items&&i.items.length>0){u=i.items.length;for(;o<u;o++){var a=i.items[o];s.push({date:new Date(a.published),config:t,html:e.tmpl(r.posted,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.foomark=function(t,n){var r=e.extend({},{bookmarked:'bookmarked <a href="${url}">${url}</a>'},t.template);e.ajax({url:"http://api.foomark.com/urls/list/",data:{format:"jsonp",username:t.user},dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i&&i.length&&i.length>0){u=i.length;for(;o<u;o++){var a=i[o];s.push({date:new Date(a.created_at.replace(/-/g,"/")),config:t,html:e.tmpl(r.bookmarked,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.formspring=function(t,n){var r=e.extend({},{answered:'answered a question <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.answered,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://www.formspring.me/profile/'+t.user+'.rss"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.forrst=function(t,n){var r=e.extend({},{posted:'posted a ${post_type} <a href="${post_url}">${title}</a>'},t.template);e.ajax({url:"http://forrst.com/api/v2/users/posts?username="+t.user,dataType:"jsonp",success:function(i){var s=[],o=0,u;if(i&&i.resp.length&&i.resp.length>0){u=i.resp.length;for(;o<u;o++){var a=i.resp[o];s.push({date:new Date(a.created_at.replace(" ","T")),config:t,html:e.tmpl(r.posted,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.foursquare=function(t,n){var r=e.extend({},{checkedin:'checked in @ <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s=0,o;if(n.query&&n.query.count&&n.query.count>0){o=n.query.count;for(;s<o;s++){var u=n.query.results.item[s];i.push({date:new Date(u.pubDate),config:t,html:e.tmpl(r.checkedin,u)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from rss where url="https://feeds.foursquare.com/history/'+t.user+'.rss"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.gimmebar=function(t,n){var r=e.extend({},{bookmarked:'bookmarked <a href="${short_url}">${title}</a>'},t.template);e.ajax({url:"https://gimmebar.com/api/v0/public/assets/"+t.user+".json?jsonp_callback=?",dataType:"json",success:function(i){i=i.records;var s=[],o=0,u;if(i&&i.length&&i.length>0){u=i.length;for(;o<u;o++){var a=i[o];s.push({date:new Date(a.date*1e3),config:t,html:e.tmpl(r.bookmarked,a)})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.github=function(t,n){var r=e.extend({},{commitCommentEvent:'commented on <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',createBranchEvent:'created branch <a href="http://github.com/${status.repo.name}/tree/${status.payload.ref}">${status.payload.ref}</a> at <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',createRepositoryEvent:'created repository <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',createTagEvent:'created tag <a href="http://github.com/${status.repo.name}/tree/${status.payload.ref}">${status.payload.ref}</a> at <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',deleteBranchEvent:'deleted branch ${status.payload.ref} at <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',deleteTagEvent:'deleted tag ${status.payload.ref} at <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',followEvent:'started following <a href="http://github.com/${status.payload.target.login}">${status.payload.target.login}</a>',forkEvent:'forked <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',gistEvent:'${status.payload.action} gist <a href="http://gist.github.com/${status.payload.gist.id}">${status.payload.gist.id}</a>',issueCommentEvent:'commented on issue <a href="http://github.com/${status.repo.name}/issues/${status.payload.issue.number}">${status.payload.issue.number}</a> on <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',issuesEvent:'${status.payload.action} issue <a href="http://github.com/${status.repo.name}/issues/${status.payload.issue.number}">${status.payload.issue.number}</a> on <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',pullRequestEvent:'${status.payload.action} pull request <a href="http://github.com/${status.repo.name}/pull/${status.payload.number}">${status.payload.number}</a> on <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',pushEvent:'pushed to <a href="http://github.com/${status.repo.name}/tree/${status.payload.ref}">${status.payload.ref}</a> at <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>',watchEvent:'started watching <a href="http://github.com/${status.repo.name}">${status.repo.name}</a>'},t.template),i=function(t){if(t.type==="CommitCommentEvent")return e.tmpl(r.commitCommentEvent,{status:t});if(t.type==="CreateEvent"&&t.payload.ref_type==="branch")return e.tmpl(r.createBranchEvent,{status:t});if(t.type==="CreateEvent"&&t.payload.ref_type==="repository")return e.tmpl(r.createRepositoryEvent,{status:t});if(t.type==="CreateEvent"&&t.payload.ref_type==="tag")return e.tmpl(r.createTagEvent,{status:t});if(t.type==="DeleteEvent"&&t.payload.ref_type==="branch")return e.tmpl(r.deleteBranchEvent,{status:t});if(t.type==="DeleteEvent"&&t.payload.ref_type==="tag")return e.tmpl(r.deleteTagEvent,{status:t});if(t.type==="FollowEvent")return e.tmpl(r.followEvent,{status:t});if(t.type==="ForkEvent")return e.tmpl(r.forkEvent,{status:t});if(t.type==="GistEvent"){t.payload.action==="create"?t.payload.action="created":t.payload.action==="update"&&(t.payload.action="updated");return e.tmpl(r.gistEvent,{status:t})}if(t.type==="IssueCommentEvent")return e.tmpl(r.issueCommentEvent,{status:t});if(t.type==="IssuesEvent")return e.tmpl(r.issuesEvent,{status:t});if(t.type==="PullRequestEvent")return e.tmpl(r.pullRequestEvent,{status:t});if(t.type==="PushEvent"){t.payload.ref=t.payload.ref.split("/")[2];return e.tmpl(r.pushEvent,{status:t})}if(t.type==="WatchEvent")return e.tmpl(r.watchEvent,{status:t})},s=function(e){var n=[],r=0,s;if(e.query&&e.query.count&&e.query.count>0){s=e.query.count;for(;r<s;r++){var o=e.query.results.json[r].json;n.push({date:new Date(o.created_at),config:t,html:i(o),url:"https://github.com/"+t.user})}}return n};e.ajax({url:e.fn.lifestream.createYqlUrl('select json.type, json.actor, json.repo, json.payload, json.created_at from json where url="https://api.github.com/users/'+t.user+'/events/public?per_page=100"'),dataType:"jsonp",success:function(e){n(s(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.googleplus=function(t,n){var r=e.extend({},{posted:'<a href="${actor.url}">${actor.displayName}</a> has posted a new entry <a href="${url}" title="${id}">${title}</a> <!--With--> ${object.replies.totalItems} replies, ${object.plusoners.totalItems} +1s, ${object.resharers.totalItems} Reshares'},t.template),i=function(n){var i=[],s=0,o,u;if(n&&n.items){o=n.items.length;for(;s<o;s++){u=n.items[s];i.push({date:new Date(u.published),config:t,html:e.tmpl(r.posted,u)})}}return i};e.ajax({url:"https://www.googleapis.com/plus/v1/people/"+t.user+"/activities/public",data:{key:t.key},dataType:"jsonp",success:function(e){if(e.error){n([]);console&&console.error&&console.error("Error loading Google+ stream.",e.error);return}n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.googlereader=function(t,n){var r=e.extend({},{starred:'shared <a href="{{if link.href}}${link.href}{{else}}${source.link.href}{{/if}}">${title.content}</a>'},t.template),i=function(n){var i=[],s,o=0,u;if(n.query&&n.query.count&&n.query.count>0){s=n.query.results.feed.entry;u=s.length;for(;o<u;o++){var a=s[o];i.push({url:"http://www.google.com/reader/shared"+t.user,date:new Date(parseInt(a["crawl-timestamp-msec"],10)),config:t,html:e.tmpl(r.starred,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="www.google.com/reader/public/atom/user%2F'+t.user+'%2Fstate%2Fcom.google%2Fbroadcast"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.hypem=function(t,n){if(!t.type||t.type!=="history"||t.type!=="loved")t.type="loved";var r=e.extend({},{loved:'loved <a href="http://hypem.com/item/${mediaid}">${title}</a> by <a href="http://hypem.com/artist/${artist}">${artist}</a>',history:'listened to <a href="http://hypem.com/item/${mediaid}">${title}</a> by <a href="http://hypem.com/artist/${artist}">${artist}</a>'},t.template);e.ajax({url:"http://hypem.com/playlist/"+t.type+"/"+t.user+"/json/1/data.js",dataType:"json",success:function(i){var s=[],o=0,u=-1;for(var a in i)i.hasOwnProperty(a)&&u++;if(i&&u>0)for(;o<u;o++){var f=i[o];s.push({date:new Date((t.type==="history"?f.dateplayed:f.dateloved)*1e3),config:t,html:e.tmpl(t.type==="history"?r.history:r.loved,f)})}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.instapaper=function(t,n){var r=e.extend({},{loved:'loved <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.loved,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://www.instapaper.com/starred/rss/'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.iusethis=function(t,n){var r=e.extend({},{global:'${action} <a href="${link}">${what}</a> on (${os})'},t.template),i=function(n){var i=[],s,o,u,a,f,l=0,c,h,p,d,v,m,g,y=["iPhone","OS X","Windows"];if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss){c=n.query.results.rss.length;d=["started using","stopped using","stopped loving","Downloaded","commented on","updated entry for","started loving","registered"];f=d.length;for(;l<c;l++){g=y[l];s=n.query.results.rss[l].channel.item;o=0;u=s.length;for(;o<u;o++){h=s[o];p=h.title.replace(t.user+" ","");a=0;for(;a<f;a++)if(p.indexOf(d[a])>-1){v=d[a];break}m=p.split(v);i.push({date:new Date(h.pubDate),config:t,html:e.tmpl(r.global,{action:v.toLowerCase(),link:h.link,what:m[1],os:g})})}}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://iphone.iusethis.com/user/feed.rss/'+t.user+'" or '+'url="http://osx.iusethis.com/user/feed.rss/'+t.user+'" or '+'url="http://win.iusethis.com/user/feed.rss/'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.lastfm=function(t,n){var r=e.extend({},{loved:'loved <a href="${url}">${name}</a> by <a href="${artist.url}">${artist.name}</a>'},t.template),i=function(n){var i=[],s,o=0,u;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.lovedtracks&&n.query.results.lovedtracks.track){s=n.query.results.lovedtracks.track;u=s.length;for(;o<u;o++){var a=s[o],f=a.nowplaying?new Date:a.date.uts;i.push({date:new Date(parseInt(f*1e3,10)),config:t,html:e.tmpl(r.loved,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://ws.audioscrobbler.com/2.0/user/'+t.user+'/lovedtracks.xml"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.librarything=function(t,n){var r=e.extend({},{book:'added <a href="http://www.librarything.com/work/book/${book.book_id}" title="${book.title} by ${book.author_fl}">${book.title} by ${book.author_fl}</a> to my library'},t.template),i=function(n){var i=[],s="";if(n.books)for(s in n.books)if(n.books.hasOwnProperty(s)){var o=n.books[s];i.push({date:new Date(o.entry_stamp*1e3),config:t,html:e.tmpl(r.book,{book:o}),url:"http://www.librarything.com/profile/"+t.user})}return i};e.ajax({url:"http://www.librarything.com/api_getdata.php?booksort=entry_REV&userid="+t.user,dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.mlkshk=function(t,n){var r=e.extend({},{posted:'posted <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.posted,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://mlkshk.com/user/'+t.user+'/rss"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.picplz=function(t,n){var r=e.extend({},{uploaded:'uploaded <a href="${url}">${title}</a>'},t.template);e.ajax({url:"http://picplz.com/api/v2/user.json?username="+t.user+"&include_pics=1",dataType:"jsonp",success:function(i){var s=[],o=0,u,a;a=i.value.users[0].pics;if(a&&a.length&&a.length>0){u=a.length;for(;o<u;o++){var f=a[o];s.push({date:new Date(f.date*1e3),config:t,html:e.tmpl(r.uploaded,{url:"http://picplz.com"+f.url,title:f.caption||f.id})})}}n(s)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.pinboard=function(t,n){var r=e.extend({},{bookmarked:'bookmarked <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0){s=n.query.results.RDF.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.date),config:t,html:e.tmpl(r.bookmarked,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://feeds.pinboard.in/rss/u:'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.posterous=function(t,n){var r=e.extend({},{posted:'posted <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.posted,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://'+t.user+'.posterous.com/rss.xml"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.reddit=function(t,n){var r=e.extend({},{commented:'<a href="http://www.reddit.com/r/${item.data.subreddit}/comments/${item.data.link_id.substring(3)}/u/${item.data.name.substring(3)}?context=3">commented (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>',created:'<a href="http://www.reddit.com${item.data.permalink}">created new thread (${score})</a> in <a href="http://www.reddit.com/r/${item.data.subreddit}">${item.data.subreddit}</a>'},t.template),i=function(t){var n=t.data.ups-t.data.downs,i={item:t,score:n>0?"+"+n:n};if(t.kind==="t1")return e.tmpl(r.commented,i);if(t.kind==="t3")return e.tmpl(r.created,i)},s=function(e){return new Date(e*1e3)};e.ajax({url:"http://www.reddit.com/user/"+t.user+".json",dataType:"jsonp",jsonp:"jsonp",success:function(e){var r=[],o=0,u;if(e&&e.data&&e.data.children&&e.data.children.length>0){u=e.data.children.length;for(;o<u;o++){var a=e.data.children[o];r.push({date:s(a.data.created_utc),config:t,html:i(a),url:"http://reddit.com/user/"+t.user})}}n(r)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.rss=function(t,n){var r=e.extend({},{posted:'posted <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u;if(n.query&&n.query.count&&n.query.count>0){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){var a=s[o];i.push({url:"http://www.google.com/reader/shared"+t.user,date:new Date(a.pubDate),config:t,html:e.tmpl(r.posted,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.slideshare=function(t,n){var r=e.extend({},{uploaded:'uploaded a presentation <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.uploaded,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://www.slideshare.net/rss/user/'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.snipplr=function(t,n){var r=e.extend({},{posted:'posted a snippet <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.posted,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="http://snipplr.com/rss/users/'+t.user+'"'),dataType:"jsonp",success:function(e){n(i(e))}})}})(jQuery);(function(e){e.fn.lifestream.feeds.stackoverflow=function(t,n){var r=e.extend({},{global:'<a href="${link}">${text}</a> - ${title}'},t.template),i=function(e){var n="",r="",i="",s="http://stackoverflow.com/users/"+t.user,o="http://stackoverflow.com/questions/";if(e.timeline_type==="badge"){n="was "+e.action+" the '"+e.description+"' badge";r=e.detail;i=s+"?tab=reputation"}else if(e.timeline_type==="comment"){n="commented on";r=e.description;i=o+e.post_id}else if(e.timeline_type==="revision"||e.timeline_type==="accepted"||e.timeline_type==="askoranswered"){n=e.timeline_type==="askoranswered"?e.action:e.action+" "+e.post_type;r=e.detail||e.description||"";i=o+e.post_id}return{link:i,title:r,text:n}},s=function(e){return new Date(e*1e3)};e.ajax({url:"http://api.stackoverflow.com/1.1/users/"+t.user+"/timeline?"+"jsonp",dataType:"jsonp",jsonp:"jsonp",success:function(o){var u=[],a=0,f;if(o&&o.total&&o.total>0&&o.user_timelines){f=o.user_timelines.length;for(;a<f;a++){var l=o.user_timelines[a];u.push({date:s(l.creation_date),config:t,html:e.tmpl(r.global,i(l))})}}n(u)}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.tumblr=function(t,n){var r=e.extend({},{posted:'posted a ${type} <a href="${url}">${title}</a>'},t.template),i=t.limit||20,s=function(t){switch(t.type){case"photo":var n=t["photo-url"];return e('<img width="75" height="75"/>').attr({src:n[n.length-1].content,title:a(t),alt:a(t)}).wrap("<div/>").parent().html();case"video":var r=t["video-player"],i=r[r.length-1].content;if(i.match(/<\s*script/))return null;return i;case"audio":return t["audio-player"]+" "+e("<div/>").text(a(t)).html();default:return null}},o=function(t,n){return e(t[n]).filter(":not(:empty):first").text()},u=function(e){var t;switch(e.type){case"regular":return e["regular-title"]||o(e,"regular-body");case"link":t=e["link-text"]||o(e,"link-description");t===""&&(t=e["link-url"]);return t;case"video":return o(e,"video-caption");case"audio":return o(e,"audio-caption");case"photo":return o(e,"photo-caption");case"quote":return'"'+e["quote-text"].replace(/<.+?>/g," ").trim()+'"';case"conversation":t=e["conversation-title"];if(!t){t=e.conversation.line;typeof t!="string"&&(t=line[0].label+" "+line[0].content+" ....")}return t;case"answer":return e.question;default:return e.type}},a=function(e){var t=u(e)||"";return t.replace(/<.+?>/gi," ")},f=function(t,n){return{date:new Date(n.date),config:t,html:e.tmpl(r.posted,{type:n.type.replace("regular","blog entry"),url:n.url,image:s(n),title:a(n)})}},l=function(n){var r=[],i=0,s,o;if(n.query&&n.query.count&&n.query.count>0)if(e.isArray(n.query.results.posts.post)){s=n.query.results.posts.post.length;for(;i<s;i++){o=n.query.results.posts.post[i];r.push(f(t,o))}}else e.isPlainObject(n.query.results.posts.post)&&r.push(f(t,n.query.results.posts.post));return r};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from tumblr.posts where username="'+t.user+'" and num="'+i+'"'),dataType:"jsonp",success:function(e){n(l(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.twitter=function(t,n){var r=e.extend({},{posted:"{{html tweet}}"},t.template),i=function(e){var t=function(e){return e.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?\/.=]+[^:\.,\)\s*$]/ig,function(e){return'<a href="'+e+'">'+(e.length>25?e.substr(0,24)+"...":e)+"</a>"})},n=function(e){return e.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15})/g,function(e,t,n){return t+'<a href="http://twitter.com/'+n+'">@'+n+"</a>"})},r=function(e){return e.replace(/(^|[^\w'"]+)\#([a-zA-Z0-9_]+)/g,function(e,t,n){return t+'<a href="http://search.twitter.com/search?q=%23'+n+'">#'+n+"</a>"})};return r(n(t(e)))},s=function(n){var s=[],o=0,u,a;if(n&&n.length>0){u=n.length;for(;o<u;o++){a=n[o];s.push({date:new Date(a.created_at),config:t,html:e.tmpl(r.posted,{tweet:i(a.text),complete_url:"http://twitter.com/#!/"+t.user+"/status/"+a.id_str}),url:"http://twitter.com/#!/"+t.user})}}return s};e.ajax({url:"https://api.twitter.com/1/statuses/user_timeline.json",data:{screen_name:t.user,include_rts:1},dataType:"jsonp",success:function(e){n(s(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.vimeo=function(t,n){var r=e.extend({},{posted:'posted <a href="${url}" title="${description}">${title}</a>'},t.template),i=function(n){var i=[],s=0,o,u;if(n){o=n.length;for(;s<o;s++){u=n[s];i.push({date:new Date(u.upload_date.replace(" ","T")),config:t,html:e.tmpl(r.posted,{url:u.url,description:u.description.replace(/"/g,"'").replace(/<.+?>/gi,""),title:u.title})})}}return i};e.ajax({url:"http://vimeo.com/api/v2/"+t.user+"/videos.json",dataType:"jsonp",crossDomain:!0,success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.wikipedia=function(t,n){var r=t.language||"en",i=e.extend({},{contribution:'contributed to <a href="${url}">${title}</a>'},t.template);e.ajax({url:"http://"+r+".wikipedia.org/w/api.php?action=query&ucuser="+t.user+"&list=usercontribs&ucdir=older&format=json",dataType:"jsonp",success:function(s){var o=[],u=0,a;if(s&&s.query.usercontribs){a=s.query.usercontribs.length;for(;u<a;u++){var f=s.query.usercontribs[u];f.url="http://"+r+".wikipedia.org/wiki/"+f.title.replace(" ","_");o.push({date:new Date(f.timestamp),config:t,html:e.tmpl(i.contribution,f)})}}n(o)}});return{template:i}}})(jQuery);(function(e){e.fn.lifestream.feeds.wordpress=function(t,n){var r=e.extend({},{posted:'posted <a href="${link}">${title}</a>'},t.template),i=function(n){var i=[],s,o=0,u,a;if(n.query&&n.query.count&&n.query.count>0&&n.query.results.rss.channel.item){s=n.query.results.rss.channel.item;u=s.length;for(;o<u;o++){a=s[o];i.push({date:new Date(a.pubDate),config:t,html:e.tmpl(r.posted,a)})}}return i},s="";if(t.user){s=t.user.indexOf("http://")===0?t.user+"/feed":"http://"+t.user+".wordpress.com/feed";e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="'+s+'"'),dataType:"jsonp",success:function(e){n(i(e)
)}})}return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.youtube=function(t,n){var r=e.extend({},{favorited:'favorited <a href="${video.player.default}" title="${video.description}">${video.title}</a>'},t.template),i=function(n){var i=[],s=0,o,u;if(n.data&&n.data.items){o=n.data.items.length;for(;s<o;s++){u=n.data.items[s];i.push({date:new Date(u.created),config:t,html:e.tmpl(r.favorited,u)})}}return i};e.ajax({url:"http://gdata.youtube.com/feeds/api/users/"+t.user+"/favorites?v=2&alt=jsonc",dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);(function(e){e.fn.lifestream.feeds.zotero=function(t,n){var r=e.extend({},{flagged:'flagged <a href="${id}">${title}</a> by ${creatorSummary}'},t.template),i=function(n){var i=[],s,o=0,u;if(n.query&&n.query.count&&n.query.count>0){s=n.query.results.feed.entry;u=s.length;for(;o<u;o++){var a=s[o];i.push({date:new Date(a.updated),config:t,url:"http://zotero.com/users/"+t.user,html:e.tmpl(r.flagged,a)})}}return i};e.ajax({url:e.fn.lifestream.createYqlUrl('select * from xml where url="https://api.zotero.org/users/'+t.user+'/items"'),dataType:"jsonp",success:function(e){n(i(e))}});return{template:r}}})(jQuery);