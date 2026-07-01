# Using Python to grab Google Street View imagery

**Update:** I have been asked several times over the years for help on this. In response I have made a simple GUI tool, given a list of addresses and a download folder location, will download all of the images. Applications are websites listing properties and marketers for mailings.

The tool costs $300, Check out the [CRIME De-Coder Store](https://crimede-coder.com/store) to purchase.

GUI Tool to download google streetview images - YouTube

Tap to unmute

[GUI Tool to download google streetview images](https://www.youtube.com/watch?v=PIkZXKGmqVM) [CrimeDe-Coder](https://www.youtube.com/channel/UC2sd1XRf80sIsyj1Au3Xunw)

![thumbnail-image](https://yt3.ggpht.com/jC00aAvc0EjcjHIE_aloLekMeLOzy59eqAl-GBIteo2vcMKLpmOhxpbzO-GFScHRe7MIcHqBoLA=s68-c-k-c0x00ffffff-no-rj)

CrimeDe-Coder30 subscribers

[Watch on](https://www.youtube.com/watch?v=PIkZXKGmqVM)

* * *

I am at it again with using Google data. For a few projects I was interested in downloading street view imagery data. It has been used in criminal justice applications as a free source for second hand systematic social observation by having people code aspects of disorder from the imagery (instead of going in person) ( [Quinn et al., 2014](http://www.citeulike.org/user/apwheele/article/13462553)), as estimates of the ambient walking around population ( [Yin et al., 2015](http://www.citeulike.org/user/apwheele/article/13760442)), and examining criminogenic aspects of the built environment ( [Vandeviver, 2014](http://www.citeulike.org/user/apwheele/article/13581922)).

I think it is just a cool source of data though to be honest. See for example Phil Cohen’s [Family Inequality post](https://familyinequality.wordpress.com/2014/12/01/detroits-decline/) in which he shows examples of auctioned houses in Detroit over time.

Using the [Google Street View image API](https://developers.google.com/maps/documentation/streetview/?hl=en) you can submit either a set of coordinates or an address and have the _latest_ street view image returned locally. This ends up being abit simpler than my prior examples (such as the [street distance API](https://andrewpwheeler.wordpress.com/2014/11/19/using-the-google-distance-api-in-spss-plus-some-eda-of-travel-time-versus-geographic-distance/) or the [places API](https://andrewpwheeler.wordpress.com/2014/05/15/using-the-google-places-api-in-python/)) because it just returns the image blob, no need to parse JSON.

Below is a simple example in python, using a set of addresses in Detroit that are part of [a land bank](http://www.michigan.gov/landbank/0,3190,7-298-52513_52517-207800--,00.html). This function takes an address and a location to download the file, then saves the resulting jpeg to your folder of choice. I defaulted for the image to be 1200×800 pixels.

```
import urllib, os

myloc = r"C:\Users\andrew.wheeler\Dropbox\Public\ExampleStreetView" #replace with your own location
key = "&key=" + "" #got banned after ~100 requests with no key

def GetStreet(Add,SaveLoc):
  base = "https://maps.googleapis.com/maps/api/streetview?size=1200x800&location="
  MyUrl = base + urllib.quote_plus(Add) + key #added url encoding
  fi = Add + ".jpg"
  urllib.urlretrieve(MyUrl, os.path.join(SaveLoc,fi))

Tests = ["457 West Robinwood Street, Detroit, Michigan 48203",\
         "1520 West Philadelphia, Detroit, Michigan 48206",\
         "2292 Grand, Detroit, Michigan 48238",\
         "15414 Wabash Street, Detroit, Michigan 48238",\
         "15867 Log Cabin, Detroit, Michigan 48238",\
         "3317 Cody Street, Detroit, Michigan 48212",\
         "14214 Arlington Street, Detroit, Michigan 48212"]

for i in Tests:
  GetStreet(Add=i,SaveLoc=myloc)
```

Dropbox has a nice mosaic view for a folder of pictures, you can view all seven photos [here](https://www.dropbox.com/sh/dayirjm1euwtv9c/AACmCnSlU-lkMrAGCbJmnbUPa?dl=0). Here is the 457 West Robinwood Street picture:

![](https://lh3.googleusercontent.com/pw/ACtC-3fzu2h0pGZOqNKuGgTBfQPYAOeaKU5i25MEqJa1X4Dg-hfeX8tbVNCVx9ZHNmSjtHRoluPR3LIwgf4RZOisRTNKjQBXibbqA7catmhMexTwopALejubR8GEl114YjxC2VbXDpXD9JEN-VMPQPJSQYee=s640-no?authuser=0)

In my tests my IP got banned after around 100 images, but you can get a verified google account which allows 25,000 image downloads per day. Unfortunately the automatic API only returns the most recent image – there is no way to return older imagery ~~nor know the date-stamp of the current image~~. (You technically could download the historical data if you know the _pano_ id for the image. I don’t see any way though to know the available pano id’s though.) Update — as of 2018 there is now a Date associated with the image, specifically a Year-Month, but no more specific than that. Not being able to figure out historical pano id’s is still a problem as far as I can tell as well.

But this is definitely easier for social scientists wishing to code images as opposed to going into the online maps. Hopefully the API gets extended to have dates and a second API to return info. on what image dates are available. I’m not sure if [Mike Bader’s software app](http://www.techtimes.com/articles/34786/20150223/new-app-harnesses-google-street-view-for-collecting-research-data.htm) is actually in the works, but for computer scientists there is a potential overlap with social scientists to do feature extraction of various social characteristics, in addition to manual coding of the images.

* * *

Update: here is a version that works for python 3+. Currently you need to have a key, no more getting a few free images before being cut off.

```
# For Python Versions 3+
# Tested V3.10 on 12/15/2021
import os
import urllib.parse
import urllib.request

myloc = r"??????????????" #replace with your own location
key = "&key=" + "????????????" #you need an actual key now!!

def GetStreet(Add,SaveLoc):
  base = "https://maps.googleapis.com/maps/api/streetview?size=1200x800&location="
  MyUrl = base + urllib.parse.quote_plus(Add) + key #added url encoding
  fi = Add + ".jpg"
  urllib.request.urlretrieve(MyUrl, os.path.join(SaveLoc,fi))

Tests = ["457 West Robinwood Street, Detroit, Michigan 48203",\
         "1520 West Philadelphia, Detroit, Michigan 48206",\
         "2292 Grand, Detroit, Michigan 48238",\
         "15414 Wabash Street, Detroit, Michigan 48238",\
         "15867 Log Cabin, Detroit, Michigan 48238",\
         "3317 Cody Street, Detroit, Michigan 48212",\
         "14214 Arlington Street, Detroit, Michigan 48212"]

for i in Tests:
  GetStreet(Add=i,SaveLoc=myloc)
```

### Share this:

- [Share on X (Opens in new window)X](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?share=twitter&nb=1)
- [Share on Facebook (Opens in new window)Facebook](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?share=facebook&nb=1)
- [Share on LinkedIn (Opens in new window)LinkedIn](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?share=linkedin&nb=1)
- [Share on Pinterest (Opens in new window)Pinterest](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?share=pinterest&nb=1)

LikeLoading...

[Reblog](https://widgets.wp.com/likes/index.html?ver=20260701# "Reblog this post on your main site.")

[Like](https://widgets.wp.com/likes/index.html?ver=20260701# "2 likes")

- [![Kok Hua](https://0.gravatar.com/avatar/398c49d3179d6494a3c701047f4ce28018bccb70a61ea1b726c46a0e5da5987c?s=96&d=identicon&r=G)](https://gravatar.com/kokhuatan "Kok Hua")
- [![meghnanatraj](https://0.gravatar.com/avatar/9cca11a9f59f5a45593009ad60c650cbd939fd40643e4fc3c251f455c152a9de?s=96&d=identicon&r=G)](https://gravatar.com/meghnanatraj "meghnanatraj")

[2 likes](https://widgets.wp.com/likes/index.html?ver=20260701#)

### _Related_

[GUI Tool to download Google Streetview Imagery](https://andrewpwheeler.com/2023/08/28/gui-tool-to-download-google-streetview-imagery/ "GUI Tool to download Google Streetview&nbsp;Imagery")August 28, 2023In "data science"

[Drawing Google Streetview images down an entire street using python](https://andrewpwheeler.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/ "Drawing Google Streetview images down an entire street using&nbsp;python")April 2, 2018In "Mapping"

[Year in Review 2025 and AI Predictions](https://andrewpwheeler.com/2025/12/24/year-in-review-2025-and-ai-predictions/ "Year in Review 2025 and AI&nbsp;Predictions")December 24, 2025In "Crime Analysis"

[48 Comments](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comments)


by [Andy Wheeler](https://andrewpwheeler.com/author/apwheele/ "View all posts by Andy Wheeler") on _December 28, 2015_
•  [Permalink](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)

Posted in [Mapping](https://andrewpwheeler.com/category/mapping/), [Python](https://andrewpwheeler.com/category/python/)

Tagged [google-streetview-api](https://andrewpwheeler.com/tag/google-streetview-api/), [Python](https://andrewpwheeler.com/tag/python/)

_Posted by Andy Wheeler on December 28, 2015_

https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/

_Previous Post_

[Testing day-of-week crime randomness paper published](https://andrewpwheeler.com/2015/12/17/testing-day-of-week-crime-randomness-paper-published/)

_Next Post_

[Blogging in review 2015](https://andrewpwheeler.com/2016/01/02/blogging-in-review-2015/)

[Leave a comment](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#respond)

### 48 Comments

01. ![Joe Devlin's avatar](https://graph.facebook.com/v2.9/10156431842784236/picture?type=large&_md5=16339dc28b5fa622224689dd4a1f8dff)





    #### Joe Devlin

    /
    [March 20, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4494)





    Thanks for this, really useful! I initially got – AttributeError: module ‘urllib’ has no attribute ‘urlretrieve’ – so amended the code slightly to import urllib.request and also added request to – urllib.request.urlretrieve(MyUrl, os.path.join(SaveLoc,fi)) – but am now getting – HTTP Error 400: Bad Request – any ideas why that might be?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4494#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [March 20, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4495)





      Sorry, not sure. Code works as is for me still (just ran it) — I am using V2.7 – are you using V3? Might be a good question for stackoverflow.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4495#respond)

    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [March 21, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4501)





      I see the ping-back someone answered your question — it needs to be encoded. I have updated the code snippet, as this is a good idea when passing arbitrary strings into the api, as other characters could cause problems as well.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4501#respond)
      - ![Joe Devlin's avatar](https://2.gravatar.com/avatar/bcf6a385bb9f91814366c48d95d93114b993209ec999732d618443418234ad2f?s=50&d=identicon&r=G)





        #### Joe Devlin

        /
        [March 23, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4523)





        Thanks Andrew! I was thinking these images would be good to use for machine learning, maybe to try and identify certain stores/brands/signs or something like that. What do you think? Have you heard of anything like that being done? Also, do you know how I can remove the link to my facebook profile from these posts?
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [March 23, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4524)





      IANAL, so view the terms of service for your own application to see if you think you are OK. I cited a few applications that are similar to machine vision applications in this post already (Yin paper and work of Mike Bader), another I am familiar with is this Streetscore, [http://ieeexplore.ieee.org/document/6910072/?tp=&arnumber=6910072&url=http:%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs\_all.jsp%3Farnumber%3D6910072](http://ieeexplore.ieee.org/document/6910072/?tp=&arnumber=6910072&url=http:%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D6910072).



      I just manually took out the link to your facebook profile from your comment.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4524#respond)
02. ![Andrew Campbell's avatar](https://1.gravatar.com/avatar/4418813ceebea0e7ada21592d16c3b383e17d14004eef9f766d9573264711634?s=50&d=identicon&r=G)





    #### Andrew Campbell

    /
    [March 20, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4497)





    This is great! I’m aware that Google Street View has a bunch of cameras that form the panoramas. I’m interested in getting the images for selected locations taken from the camera facing in the frontward direction. I’m relatively new to python so i’m wondering if you have any suggestions on whether it’s possible?



    Thanks!





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4497#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [March 21, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4508)





      I’m not sure what you mean. Can you be more specific?





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4508#respond)
03. ![Andrew Campbell's avatar](https://1.gravatar.com/avatar/4418813ceebea0e7ada21592d16c3b383e17d14004eef9f766d9573264711634?s=50&d=identicon&r=G)





    #### Andrew Campbell

    /
    [March 21, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4511)





    The images that download to the specified destination from the code are taken from a view looking at houses along a street. Is there a way in which the images can be oriented to face the road? I’m interested in looking at roadside assets in google street view imagery





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4511#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [March 22, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4513)





      Ok, to do that it takes alittle bit of GIS know-how. First you need to find the orientation of the street, then you can identify which direction to point the camera. If you submit a lat-lon (and orientation) you can get an image for anywhere in the panorama.



      I did this for another project in which I needed to take running images of whole streets. What I did was generate a fine sample of points along the street (like every meter), in a GIS. From that data you can calculate the local orientation of the street. Then I sampled google street view images about every 40 meters (so there was little to no overlap between shots). But I requested images at 90 degrees to the street orientation (so I got the sidewalk), whereas here you would want to just look straight ahead (or backwards?).





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4513#respond)
      - ![Andrew Campbell's avatar](https://1.gravatar.com/avatar/4418813ceebea0e7ada21592d16c3b383e17d14004eef9f766d9573264711634?s=50&d=identicon&r=G)





        #### Andrew Campbell

        /
        [March 27, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4538)





        Thanks for your response Andrew.



        This is actually for a GIS project so my GIS know-how is solid. You’re correct in that I do want to look straight ahead (90 degrees, give or take accounting for optimal viewing) of the street. My question would be, where do i need to define the lat longs and orientation for each individual image location in the code?

      - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





        #### [apwheele](https://andrewpwheeler.wordpress.com/)

        /
        [March 27, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4555)





        Just using a street-centerline file I created sample points regularly along the segment. Is that your question? You can email and I can share code if you want (I just made the regularly sampled point in ArcGIS).
04. ![Simon Ghislain's avatar](https://2.gravatar.com/avatar/be8d0b69d69ba1b98f866113967480279f92553f45d6e7499ba13b0e00c35983?s=50&d=identicon&r=G)





    #### Simon Ghislain

    /
    [May 12, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4690)





    Hello,



    i just installed python 3.5 and pyCharm, pasted the code, and got relatively same error at run as Joe Devlin:


    AttributeError: module ‘urllib’ has no attribute ‘quote\_plus’



    Btw thank you very much for getting me on tracks…and sharing your code.


    I’m trying to


    1) define an itinerary from point A to point B


    2) generate, like in your reply to Andrew Campbell, a set of points every 40m or so


    3) use those points to calculate local direction of road


    4) generate google street screenshots with your code



    (I would like to make an animated GIF of that itinerary)



    But i don’t know where to start…i would like NOT to use ArcGIS (i used to use it but i don’t have it anymore). Also i’m new to Python too, altough i have some background in programmation and coding.


    Is it possible to use the Google itinerary tool to extract the set of points? (instead of a street-centerline file, whiwh I suppose is generated with ArcGIS?)


    Could you please help me in telling me the main steps I should follow in order to achieve that?


    I would be so thankful…



    Thank you very much in advance for any help, and already for sharing your knowledge





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4690#respond)

05. ![Simon Ghislain's avatar](https://2.gravatar.com/avatar/be8d0b69d69ba1b98f866113967480279f92553f45d6e7499ba13b0e00c35983?s=50&d=identicon&r=G)





    #### Simon Ghislain

    /
    [May 12, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4692)





    Ok, the library urllib has been split into urllib.request, urllib.parse ans urllib.error from Python 2.x to Python 3.x



    So only change is to write “urllib.parse.quote\_plus” instead of “urllib.quote\_plus”


    and write


    “urllib.request.urlretrieve” instead of “urllib.urlretrieve”



    But then i got another error:


    line 258, in urlretrieve


    tfp = open(filename, ‘wb’)


    FileNotFoundError: \[Errno 2\] No such file or directory: ‘C:\\\tests\\\ExampleStreetView\\\457 West Robinwood Street, Detroit, Michigan 48203.jpg’



    So looks like urlretrieve, instead of copying url content to a new file, tries to access the file beeing created?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4692#respond)

06. ![Simon Ghislain's avatar](https://2.gravatar.com/avatar/be8d0b69d69ba1b98f866113967480279f92553f45d6e7499ba13b0e00c35983?s=50&d=identicon&r=G)





    #### Simon Ghislain

    /
    [May 12, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-4693)





    Yeah it works!


    Simply the destination directory didn’t exist yet…


    Wow so magical…I tried with my own adress, get the .jpg in less than one second…



    Now the last thing I would like to do is instead of a list of addresses, generate a set of coordinates and determine direction alongside road from a Google Map itinerary…with Direction aAPI? Is is possible?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=4693#respond)

07. ![ganesh's avatar](https://1.gravatar.com/avatar/dd664d34972dbc0df9588f0dfb3b584a8c1a4233ba359b353cce2e8f76158edc?s=50&d=identicon&r=G)





    #### ganesh

    /
    [October 15, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-5233)





    am having this error could any one help me Error interpreting JPEG image file (Not a JPEG file: starts with 0x89 0x50)4





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=5233#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [October 15, 2018](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-5235)





      Sorry, not sure what the issue would be to cause this.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=5235#respond)
08. ![Valerio De Luca's avatar](https://graph.facebook.com/v2.9/10214451850923165/picture?type=large&_md5=95e192097a8a722318e4d61d277063e8)





    #### Valerio De Luca

    /
    [January 4, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-6191)





    [https://stackoverflow.com/questions/11310220/why-am-i-getting-the-error-not-a-jpeg-file-starts-with-0x89-0x50](https://stackoverflow.com/questions/11310220/why-am-i-getting-the-error-not-a-jpeg-file-starts-with-0x89-0x50)





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=6191#respond)

09. ![john's avatar](https://2.gravatar.com/avatar/e2f1d5e19cdf6eb1dd8f313839b6ec297e16d27df6beba5971332fe6f53b81af?s=50&d=identicon&r=G)





    #### john

    /
    [April 4, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7112)





    I am working on a project that requires me to gather aerial views of specific locations within larger developments. Due to the areas being located on the interior of the sites, street view images will not always give me the appropriate view. You mentioned in the article that you can use street addresses or coordinates. Is there a way to use the coordinates to gather aerial images as opposed to the street view?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=7112#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [April 5, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7120)





      Are you asking about oblique imagery? Or just plain old satellite photos?



      For google I think you need to use javascript to get either, [https://developers.google.com/maps/documentation/javascript/maptypes#45DegreeImagery](https://developers.google.com/maps/documentation/javascript/maptypes#45DegreeImagery).



      If you just want satellite you should geocode the addresses, then I imagine there are a bunch of different options to grab the images beyond Google.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=7120#respond)
      - ![john's avatar](https://2.gravatar.com/avatar/e2f1d5e19cdf6eb1dd8f313839b6ec297e16d27df6beba5971332fe6f53b81af?s=50&d=identicon&r=G)





        #### john

        /
        [April 5, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7121)





        Just satellite photos, thank you for your response and help!

      - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





        #### [apwheele](https://andrewpwheeler.wordpress.com/)

        /
        [April 5, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7122)





        Apparently there is a Google static map API that you can get just the overhead images with a URL (just inputting the address), [https://developers.google.com/maps/documentation/maps-static/dev-guide](https://developers.google.com/maps/documentation/maps-static/dev-guide), so that would work similar to here. Build the URL and save the image on your local machine.
10. ![Angel R's avatar](https://1.gravatar.com/avatar/7ca967e841f0020c290573c66efd1e52f8f8d63813ea6143f5dd42dec362ed8c?s=50&d=identicon&r=G)





    #### Angel R

    /
    [May 7, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7536)





    Finally got this to work for me, however, the resulting jpegs cannot be opened by any of my photo/image viewer programs. All show to be 259 byte (1kb), JPG files. Not sure what is happening.





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=7536#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [May 7, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-7537)





      See some of the earlier comments, it may be the same problem (saved as a jpeg extension but is actually a PNG file).





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=7537#respond)
      - ![Juan Marrugo's avatar](https://0.gravatar.com/avatar/60439997e95a1e04538213f9dd3d1793e491fc38e67a7207e5cb02d90f5de157?s=50&d=identicon&r=G)





        #### Juan Marrugo

        /
        [November 1, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-8434)





        I found out that you have to enable billing in the Google Cloud Console. If you enter the API key and run the program, you get those tiny files. Open any of the files using notepad, it should say “The Google Maps Platform server rejected your request. You must enable Billing on the Google Cloud Project at [https://console.cloud.google.com/project/\_/billing/enable](https://console.cloud.google.com/project/_/billing/enable) Learn more at [https://developers.google.com/maps/gmp-get-started](https://developers.google.com/maps/gmp-get-started)“. On the other hand, if you do not enter an API key you get “The Google Maps Platform server rejected your request. You must use an API key to authenticate each request to Google Maps Platform APIs. For additional information, please refer to [http://g.co/dev/maps-no-account](http://g.co/dev/maps-no-account)“.

      - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





        #### [apwheele](https://andrewpwheeler.wordpress.com/)

        /
        [November 3, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-8442)





        Yes, to enable billing you need to provide a credit card for verification. But that does not mean you will actually be billed, you can set the API so it will cut off before the free limits run out (or just not submit that many requests).



        If you have many more requests than the free billing allows, you should use a local geocoder or street centerlines to figure out the orientation stuff. But the streetview images are unique with no alternative that I am aware of.
11. ![Juan Marrugo's avatar](https://0.gravatar.com/avatar/60439997e95a1e04538213f9dd3d1793e491fc38e67a7207e5cb02d90f5de157?s=50&d=identicon&r=G)





    #### Juan Marrugo

    /
    [November 1, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-8432)





    Hi Andrew, hope you are doing fine. I searched for a way to grab Google Streetview images automatically and I was sent to your post. However I have a few questions:


    1) Should I enable any specifics in the google console for it to work better on your script? I enabled Street View Static API, is that enough?


    2) I have a set of randomly assorted points over a map, all set to fall in the center of a building. I need a photo of such building. Do you a way to batch reverse geocode the lat long coordinates into local directions? My main concern is that the pictures end up facing the wrong direction, and hence not showing the buildings.


    3) If I were to use the Lat Long coordinates, what format should I use for it?



    Thanks in advance,



    Juan





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=8432#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [November 1, 2019](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-8433)





      For 1 yeah that is all that is needed. There are different tools to make sure you don’t go over your limit, but they don’t affect anything else.



      For 2 yes I would reverse geocode the lat lon and then submit the address. (You can use another Google api to reverse geocode.) If you have the base centerlines files you could snap the lat lon to the nearest centerline, figure out orientation, and then figure out the lat/lon and orientation, but that is more work.



      For 3 check out this other blog post I did, [https://andrewpwheeler.wordpress.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/](https://andrewpwheeler.wordpress.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/).





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=8433#respond)
12. ![thejodyfall's avatar](https://0.gravatar.com/avatar/633e95562d4194eeb89a94bcd0f4ba7e77375b6f291cb7548ebdb79ff77b3db1?s=50&d=identicon&r=G)





    #### thejodyfall

    /
    [November 18, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14361)





    Hello, thanks for this post – really interesting. Is there a way to get a list of locations linked from an initial location in google maps/street view? So if I had a starting location, could I find out programmatically the linked locations, similar to the way street view works with the control arrows?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=14361#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [November 18, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14362)





      So two things you might be interested in. One is reverse geocoding, here you input a lat/lon pair and get back the addresses that are nearby, [https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding](https://developers.google.com/maps/documentation/geocoding/overview#ReverseGeocoding).



      The second will be the google places lookup. This is like reverse geocoding, except it will return googles listed businesses, [https://andrewpwheeler.com/2014/05/15/using-the-google-places-api-in-python/](https://andrewpwheeler.com/2014/05/15/using-the-google-places-api-in-python/).



      I’m not 100% sure if this snippet is good for python3, [https://dl.dropboxusercontent.com/s/f4ivwa7lif8fmrp/Grid\_Googleplaces.py?dl=0](https://dl.dropboxusercontent.com/s/f4ivwa7lif8fmrp/Grid_Googleplaces.py?dl=0), but that is closer to a full script for given a specify type of business, crawl over a whole city (given by a lat/lon bounding box).





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=14362#respond)
      - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





        #### [apwheele](https://andrewpwheeler.wordpress.com/)

        /
        [November 18, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14363)





        Oh and here I have an example of using the reverse geocoding api, [https://andrewpwheeler.com/2016/05/03/neighborhoods-in-albany-according-to-google/](https://andrewpwheeler.com/2016/05/03/neighborhoods-in-albany-according-to-google/)
13. ![thejodyfall's avatar](https://0.gravatar.com/avatar/633e95562d4194eeb89a94bcd0f4ba7e77375b6f291cb7548ebdb79ff77b3db1?s=50&d=identicon&r=G)





    #### thejodyfall

    /
    [November 18, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14364)





    Wow, that’s amazing! Will take a look through – thank you so much.





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=14364#respond)

14. ![M's avatar](https://2.gravatar.com/avatar/2eb6a73b4cfc808e5495bf68e74c21394d197c24f1f5080d4e11197f22683c50?s=50&d=identicon&r=G)





    #### M

    /
    [December 14, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14653)





    I tried the code and I am using python 3.10 version and it gives me this error. raise HTTPError(req.full\_url, code, msg, hdrs, fp)


    urllib.error.HTTPError: HTTP Error 403: Forbidden



    I am not sure what is causing this error.


    Thank you for your help. If anyone has a new version of this code. I would be appreciated to share it with me.


    Thanks.





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=14653#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [December 15, 2021](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-14656)





      See the update at the end of the post now.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=14656#respond)
15. ![Cristian's avatar](https://1.gravatar.com/avatar/7ce6143325f71c301a828e604c31a67e095082a3f0fbb6abda8026792c56786c?s=50&d=identicon&r=G)





    #### Cristian

    /
    [April 7, 2022](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-15707)





    Hi, nice post. I am trying to get every image on GSV from my city. As is saw on one of your replys, you said you take images every 30m. How did you do that? Is there another library for that?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=15707#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [April 7, 2022](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-15709)





      See this post, [https://andrewpwheeler.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/](https://andrewpwheeler.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/). You need to have a street file in a GIS and sample at regular points + calculate the orientation of the street.





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=15709#respond)
16. ![gadapwar sai's avatar](https://0.gravatar.com/avatar/6b356bd4b3e61edc2cadc51424353a3249beda294137dafc37cab63eb59dffd6?s=50&d=identicon&r=G)





    #### gadapwar sai

    /
    [August 29, 2023](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21260)





    can any drop project code here





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21260#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [August 29, 2023](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21261)





      What do you mean project code? An API key perhaps?





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21261#respond)
      - ![Saiprasad Gadapwar's avatar](https://0.gravatar.com/avatar/6b356bd4b3e61edc2cadc51424353a3249beda294137dafc37cab63eb59dffd6?s=50&d=identicon&r=G)





        #### Saiprasad Gadapwar

        /
        [August 29, 2023](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21264)





        No complete code of this project i said to share

      - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





        #### [apwheele](https://andrewpwheeler.wordpress.com/)

        /
        [August 29, 2023](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21265)





        I don’t know what you want — the blog post has the code examples. The GUI tool I created I am selling for $300, I am not going to give that away for free.
17. ![gera's avatar](https://0.gravatar.com/avatar/c4822767df8de7c87c682d442e8c490869d9152e236f7f606b7238710190edf9?s=50&d=identicon&r=G)





    #### gera

    /
    [July 3, 2024](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21557)





    How do you become a verified google accounts? Is the 25 000 images per day still valid? Also is it possible to take images, based on the address and take save the closed up image of it from the map above? Thank you!





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21557#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [July 3, 2024](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21558)





      To sign up for key, you need to set up a Google cloud console and confirm a credit card to get the $200 free monthly credit.



      [https://developers.google.com/maps/get-started](https://developers.google.com/maps/get-started)



      For the “map above”, you may either check out the static map (for a satellite type view), or the aerial view API,



      [https://mapsplatform.google.com/maps-products/](https://mapsplatform.google.com/maps-products/)





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21558#respond)
18. ![Rich Engle's avatar](https://graph.facebook.com/v6.0/10233410570985251/picture?type=large)





    #### Rich Engle

    /
    [July 4, 2025](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21714)





    cool. i am in detroit, and wanted to let ppl see what it would be like to drive from place to place here, or even visit the UP.



    Have you seen anyone get this kind of live streaming of a car ride map?





    [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21714#respond)
    - ![Andy Wheeler's avatar](https://0.gravatar.com/avatar/625de19aa82399280a350ef901763316912ebae83c7eeaaeca306f9cdfd3cc16?s=50&d=identicon&r=G)





      #### [apwheele](https://andrewpwheeler.wordpress.com/)

      /
      [July 4, 2025](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comment-21715)





      I have not seen anything like that Rich!





      [Reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/?replytocom=21715#respond)

1. [Python, Google street view API – HTTP Error 400: Bad Request – program faq](http://www.programfaqs.com/faq/python-google-street-view-api-http-error-400-bad-request/)
2. [Drawing Google Streetview images down an entire street using python \| Andrew Wheeler](https://andrewpwheeler.wordpress.com/2018/04/02/drawing-google-streetview-images-down-an-entire-street-using-python/)
3. [Using the Google Vision and Streetview API to Explore Hotspots \| Andrew Wheeler](https://andrewpwheeler.com/2020/10/24/using-the-google-vision-and-streetview-api-to-explore-hotspots/)
4. [Using google places API in criminology research? \| Andrew Wheeler](https://andrewpwheeler.com/2021/06/20/using-google-places-api-in-criminology-research/)
5. [GUI Tool to download Google Streetview Imagery \| Andrew Wheeler](https://andrewpwheeler.com/2023/08/28/gui-tool-to-download-google-streetview-imagery/)

### Leave a comment [Cancel reply](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/\#respond)

Δ

- [Comment](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/#comments)
- [Reblog](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)
- [Subscribe](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/) [Subscribed](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)








  - [![](https://andrewpwheeler.com/wp-content/uploads/2017/06/apwface.png?w=50) Andrew Wheeler](https://andrewpwheeler.com/)

Join 390 other subscribers

Sign me up

  - Already have a WordPress.com account? [Log in now.](https://wordpress.com/log-in?redirect_to=https%3A%2F%2Fr-login.wordpress.com%2Fremote-login.php%3Faction%3Dlink%26back%3Dhttps%253A%252F%252Fandrewpwheeler.com%252F2015%252F12%252F28%252Fusing-python-to-grab-google-street-view-imagery%252F)


- - [![](https://andrewpwheeler.com/wp-content/uploads/2017/06/apwface.png?w=50) Andrew Wheeler](https://andrewpwheeler.com/)
  - [Subscribe](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/) [Subscribed](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)
  - [Sign up](https://wordpress.com/start/)
  - [Log in](https://wordpress.com/log-in?redirect_to=https%3A%2F%2Fr-login.wordpress.com%2Fremote-login.php%3Faction%3Dlink%26back%3Dhttps%253A%252F%252Fandrewpwheeler.com%252F2015%252F12%252F28%252Fusing-python-to-grab-google-street-view-imagery%252F)
  - [Copy shortlink](https://wp.me/p23Z4C-hY)
  - [Report this content](https://wordpress.com/abuse/?report_url=https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)
  - [View post in Reader](https://wordpress.com/reader/blogs/30502426/posts/1114)
  - [Manage subscriptions](https://subscribe.wordpress.com/)
  - [Collapse this bar](https://andrewpwheeler.com/2015/12/28/using-python-to-grab-google-street-view-imagery/)

%d