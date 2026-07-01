[Skip to main content](https://pypi.org/project/google-streetview/#content) Switch to mobile version

Search PyPISearch

# google-streetview 1.2.9

pip install google-streetviewCopy PIP instructions

[Latest release](https://pypi.org/project/google-streetview/)

Released: Mar 5, 2019

A command line tool and module for Google Street View Image API.

### Navigation

### Verified details

_These details have been [verified by PyPI](https://docs.pypi.org/project_metadata/#verified-details)_

###### Maintainers

[![Avatar for rrwen from gravatar.com](https://pypi-camo.freetls.fastly.net/4489b1131c774095de637ab0d7353a8184a204f2/68747470733a2f2f7365637572652e67726176617461722e636f6d2f6176617461722f62636363666666373438633635653133383838666464396637626364356433373f73697a653d3530)rrwen](https://pypi.org/user/rrwen/)

### Unverified details

_These details have **not** been verified by PyPI_

###### Project links

- [Homepage](https://github.com/rrwen/google_streetview)
- [Download](https://github.com/rrwen/google_streetview/archive/master.zip)

###### Meta

- **License:** MIT

- **Author:** [Richard Wen](mailto:rrwen.dev@gmail.com)
- Tags
google
,
api
,
street
,
view
,
streetview
,
image
,
map
,
address
,
location
,
road
,
route
,
city
,
panorama
,
photo
,
cli
,
command
,
line
,
interface
,
tool
,
module


[Report project as malware](https://pypi.org/project/google-streetview/submit-malware-report/)

## Project description

# google\_streetview

Richard Wen

[rrwen.dev@gmail.com](mailto:rrwen.dev@gmail.com)

- [Documentation](https://rrwen.github.io/google_streetview)

A command line tool and module for Google Street View Image API.

[![pypi version](https://pypi-camo.freetls.fastly.net/81458e46cfe307db6c543dca3585e78d7d024de6/68747470733a2f2f62616467652e667572792e696f2f70792f676f6f676c652d737472656574766965772e737667)](https://badge.fury.io/py/google-streetview)[![Build Status](https://pypi-camo.freetls.fastly.net/67e6c60669f47f0eb71a58bd0ac22c0be241108c/68747470733a2f2f7472617669732d63692e6f72672f727277656e2f676f6f676c655f737472656574766965772e7376673f6272616e63683d6d6173746572)](https://travis-ci.org/rrwen/google_streetview)[![Coverage Status](https://pypi-camo.freetls.fastly.net/e33489f08c3f130fbe169b3a53a93fceb75e46f0/68747470733a2f2f636f766572616c6c732e696f2f7265706f732f6769746875622f727277656e2f676f6f676c655f737472656574766965772f62616467652e7376673f6272616e63683d6d6173746572)](https://coveralls.io/github/rrwen/google_streetview?branch=master)[![Stars](https://pypi-camo.freetls.fastly.net/95a2bc0d54ee71738e53e7673022a62a6c48b063/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f727277656e2f676f6f676c655f737472656574766965772e737667)](https://github.com/google_streetview/stargazers)[![GitHub license](https://pypi-camo.freetls.fastly.net/db77c1a55b53660b5d35198832508f437d32352e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f727277656e2f676f6f676c655f737472656574766965772e737667)](https://github.com/rrwen/google_streetview/blob/master/LICENSE)[![Donarbox Donate](https://pypi-camo.freetls.fastly.net/574302b0ee919fffc1727e6fada674f4ee9ca647/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f6e6174652d446f6e6172626f782d79656c6c6f772e737667)](https://donorbox.org/rrwen)[![PayPal Donate](https://pypi-camo.freetls.fastly.net/3c27b13cc7a1d97940353a614948e3c4a5175500/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f646f6e6174652d50617950616c2d79656c6c6f772e737667)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=NQNSAHK5X46D2)[![Twitter](https://pypi-camo.freetls.fastly.net/7a4f099f97ba67bbbc39f3c35898831f15640318/68747470733a2f2f696d672e736869656c64732e696f2f747769747465722f75726c2f68747470732f6769746875622e636f6d2f727277656e2f676f6f676c655f737472656574766965772e7376673f7374796c653d736f6369616c)](https://twitter.com/intent/tweet?text=A%20command%20line%20tool%20and%20module%20for%20Google%20Street%20View%20Image%20API:%20https://github.com/rrwen/google_streetview%20%23python%20%23pip)

**Note**: Google changed [StreetView API pricing](https://developers.google.com/maps/documentation/streetview/usage-and-billing) and a billing plan may be required (checked March 5, 2019).

## Install

1. Install [Python](https://www.python.org/downloads/)
2. Install [google\_streetview](https://pypi.python.org/pypi/google-streetview) via `pip`

```
pip install google_streetview
```

For the latest developer version, see [Developer Install](https://github.com/rrwen/google_streetview/blob/master/NOTES.rst#developer-install).

## Usage

For help in the console:

```
google_streetview -h
```

Ensure that a [Google API developer key](https://developers.google.com/api-client-library/python/auth/api-keys) is set:

```
google_streetview -s key="your_dev_key"
```

Search street view for latitude and longitude `46.414382,10.013988`:

```
google_streetview "46.414382,10.013988"
```

Save images to a directory:

```
google_streetview --location="46.414382,10.013988" --save_downloads=downloads
```

Obtain a 360 panorama by rotating the camera `heading` given a 90 degree field of vision `fov`::

```
google_streetview --location="46.414382,10.013988" --fov=90 --heading=0;90;180;270
```

Use as a Python module:

```
# Import google_streetview for the api module
import google_streetview.api

# Define parameters for street view api
params = [{\
	'size': '600x300', # max 640x640 pixels\
	'location': '46.414382,10.013988',\
	'heading': '151.78',\
	'pitch': '-0.76',\
	'key': 'your_dev_key'\
}]

# Create a results object
results = google_streetview.api.results(params)

# Download images to directory 'downloads'
results.download_links('downloads')
```

For more usage details, see the [Documentation](https://rrwen.github.io/google_streetview).

## Contributions

1. Reports for issues and suggestions can be made using the [issue submission](https://github.com/rrwen/google_streetview/issues)
2. Code contributions are submitted via [pull requests](https://github.com/rrwen/google_streetview/pulls)

See [CONTRIBUTING.rst](https://github.com/rrwen/google_streetview/blob/master/CONTRIBUTING.rst) for more details.

## Implementation

The package [google\_streetview](https://pypi.python.org/pypi/google-streetview) uses the following components:

| Component | Purpose |
| --- | --- |
| [Google Street View Image API](https://developers.google.com/maps/documentation/streetview) | API for Google Street View images |
| [google\_streetview.api](https://github.com/rrwen/google_streetview/blob/master/google_streetview/api.py) | Module for interfacing with Google Street View Image API using requests |
| [requests](https://pypi.python.org/pypi/requests) | Download and get URLs from Google Street View Image API |

```

  Google Street View Image API     <-- API for Street View Images
               |
      google_streetview.api        <-- URL Request with query string
               |
            request                <-- Download URLs and images
```

For more information, see [NOTES.rst](https://github.com/rrwen/google_streetview/blob/master/NOTES.rst).

## Project details

### Verified details

_These details have been [verified by PyPI](https://docs.pypi.org/project_metadata/#verified-details)_

###### Maintainers

[![Avatar for rrwen from gravatar.com](https://pypi-camo.freetls.fastly.net/4489b1131c774095de637ab0d7353a8184a204f2/68747470733a2f2f7365637572652e67726176617461722e636f6d2f6176617461722f62636363666666373438633635653133383838666464396637626364356433373f73697a653d3530)rrwen](https://pypi.org/user/rrwen/)

### Unverified details

_These details have **not** been verified by PyPI_

###### Project links

- [Homepage](https://github.com/rrwen/google_streetview)
- [Download](https://github.com/rrwen/google_streetview/archive/master.zip)

###### Meta

- **License:** MIT

- **Author:** [Richard Wen](mailto:rrwen.dev@gmail.com)
- Tags
google
,
api
,
street
,
view
,
streetview
,
image
,
map
,
address
,
location
,
road
,
route
,
city
,
panorama
,
photo
,
cli
,
command
,
line
,
interface
,
tool
,
module


## Release history[Release notifications](https://pypi.org/help/\#project-release-notifications) \|  [RSS feed](https://pypi.org/rss/project/google-streetview/releases.xml)

This version

![](https://pypi.org/static/images/blue-cube.572a5bfb.svg)

[1.2.9\\
\\
\\
Mar 5, 2019](https://pypi.org/project/google-streetview/1.2.9/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.8\\
\\
\\
Mar 5, 2019](https://pypi.org/project/google-streetview/1.2.8/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.7\\
\\
\\
Mar 5, 2019](https://pypi.org/project/google-streetview/1.2.7/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.6\\
\\
\\
Mar 5, 2019](https://pypi.org/project/google-streetview/1.2.6/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.5\\
\\
\\
Mar 5, 2019](https://pypi.org/project/google-streetview/1.2.5/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.4\\
\\
\\
Jan 7, 2018](https://pypi.org/project/google-streetview/1.2.4/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.3\\
\\
\\
Jan 7, 2018](https://pypi.org/project/google-streetview/1.2.3/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.2\\
\\
\\
Jan 7, 2018](https://pypi.org/project/google-streetview/1.2.2/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.1\\
\\
\\
Jan 6, 2018](https://pypi.org/project/google-streetview/1.2.1/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.2.0\\
\\
\\
Jan 6, 2018](https://pypi.org/project/google-streetview/1.2.0/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.9\\
\\
\\
Jan 6, 2018](https://pypi.org/project/google-streetview/1.1.9/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.8\\
\\
\\
Jan 6, 2018](https://pypi.org/project/google-streetview/1.1.8/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.7\\
\\
\\
Nov 7, 2017](https://pypi.org/project/google-streetview/1.1.7/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.6\\
\\
\\
Nov 7, 2017](https://pypi.org/project/google-streetview/1.1.6/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.5\\
\\
\\
Aug 16, 2017](https://pypi.org/project/google-streetview/1.1.5/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.4\\
\\
\\
Aug 16, 2017](https://pypi.org/project/google-streetview/1.1.4/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.3\\
\\
\\
Aug 16, 2017](https://pypi.org/project/google-streetview/1.1.3/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.2\\
\\
\\
Aug 16, 2017](https://pypi.org/project/google-streetview/1.1.2/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.1\\
\\
\\
Jul 5, 2017](https://pypi.org/project/google-streetview/1.1.1/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.1.0\\
\\
\\
Jul 5, 2017](https://pypi.org/project/google-streetview/1.1.0/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[1.0.0\\
\\
\\
Jun 6, 2017](https://pypi.org/project/google-streetview/1.0.0/)

![](https://pypi.org/static/images/white-cube.2351a86c.svg)

[0.0.0\\
\\
\\
Jun 6, 2017](https://pypi.org/project/google-streetview/0.0.0/)

## Download files

Download the file for your platform. If you're not sure which to choose, learn more about [installing packages](https://packaging.python.org/tutorials/installing-packages/ "External link").

### Source Distribution

[google\_streetview-1.2.9.tar.gz](https://files.pythonhosted.org/packages/04/33/be168a62a973e8dd3f00a83b2481f4c5602bb8339cbe81cf70a437b04ade/google_streetview-1.2.9.tar.gz)
(7.5 kB
[view details](https://pypi.org/project/google-streetview/#google_streetview-1.2.9.tar.gz))


Uploaded Mar 5, 2019`Source`

## File details

Details for the file `google_streetview-1.2.9.tar.gz`.


### File metadata

- Download URL: [google\_streetview-1.2.9.tar.gz](https://files.pythonhosted.org/packages/04/33/be168a62a973e8dd3f00a83b2481f4c5602bb8339cbe81cf70a437b04ade/google_streetview-1.2.9.tar.gz)
- Upload date: Mar 5, 2019
- Size: 7.5 kB
- Tags: Source
- Uploaded using Trusted Publishing? No
- Uploaded via: twine/1.13.0 pkginfo/1.4.2 requests/2.21.0 setuptools/39.1.0 requests-toolbelt/0.9.1 tqdm/4.31.1 CPython/3.6.5

### File hashes

| Algorithm | Hash digest |  |
| --- | --- | --- |
| SHA256 | `f124982c4e16a7e15688e875928a227368739d12a07d2db2d2fdd0767edcc38d` | Copy |
| MD5 | `3b1a4b69d4ebcc4e6bfe420ef1d2e6e8` | Copy |
| BLAKE2b-256 | `0433be168a62a973e8dd3f00a83b2481f4c5602bb8339cbe81cf70a437b04ade` | Copy |

Hashes for google\_streetview-1.2.9.tar.gz

[See more details on using hashes here.](https://pip.pypa.io/en/stable/topics/secure-installs/#hash-checking-mode "External link")

- English
- español
- français
- 日本語
- português (Brasil)
- українська
- Ελληνικά
- Deutsch
- 中文 (简体)
- 中文 (繁體)
- русский
- עברית
- Esperanto
- 한국어

Supported by

[![](https://pypi-camo.freetls.fastly.net/ed7074cadad1a06f56bc520ad9bd3e00d0704c5b/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f6177732d77686974652d6c6f676f2d7443615473387a432e706e67)AWS\\
Cloud computing and Security Sponsor](https://aws.amazon.com/) [![](https://pypi-camo.freetls.fastly.net/8855f7c063a3bdb5b0ce8d91bfc50cf851cc5c51/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f64617461646f672d77686974652d6c6f676f2d6668644c4e666c6f2e706e67)Datadog\\
Monitoring](https://www.datadoghq.com/) [![](https://pypi-camo.freetls.fastly.net/60f709d24f3e4d469f9adc77c65e2f5291a3d165/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f6465706f742d77686974652d6c6f676f2d7038506f476831302e706e67)Depot\\
Continuous Integration](https://depot.dev/) [![](https://pypi-camo.freetls.fastly.net/df6fe8829cbff2d7f668d98571df1fd011f36192/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f666173746c792d77686974652d6c6f676f2d65684d3077735f6f2e706e67)Fastly\\
CDN](https://www.fastly.com/) [![](https://pypi-camo.freetls.fastly.net/420cc8cf360bac879e24c923b2f50ba7d1314fb0/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f676f6f676c652d77686974652d6c6f676f2d616734424e3774332e706e67)Google\\
Download Analytics](https://careers.google.com/) [![](https://pypi-camo.freetls.fastly.net/d01053c02f3a626b73ffcb06b96367fdbbf9e230/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f70696e67646f6d2d77686974652d6c6f676f2d67355831547546362e706e67)Pingdom\\
Monitoring](https://www.pingdom.com/) [![](https://pypi-camo.freetls.fastly.net/67af7117035e2345bacb5a82e9aa8b5b3e70701d/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f73656e7472792d77686974652d6c6f676f2d4a2d6b64742d706e2e706e67)Sentry\\
Error logging](https://sentry.io/for/python/?utm_source=pypi&utm_medium=paid-community&utm_campaign=python-na-evergreen&utm_content=static-ad-pypi-sponsor-learnmore) [![](https://pypi-camo.freetls.fastly.net/b611884ff90435a0575dbab7d9b0d3e60f136466/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f707970692d6173736574732f73706f6e736f726c6f676f732f737461747573706167652d77686974652d6c6f676f2d5467476c6a4a2d502e706e67)StatusPage\\
Status page](https://statuspage.io/)