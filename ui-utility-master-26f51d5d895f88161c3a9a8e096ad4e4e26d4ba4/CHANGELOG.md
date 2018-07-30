# 0.2.0 (September 01, 2017) 🎉
## Fixed
  * could not delete page (0.1.4)
  * clone page will link all stencils of two pages together (0.1.5)
  * RadioButtonGroup cannot be edited (0.1.5)
  * RTChart upper & lower bound color gray to red (0.1.6)
  * Page not found after refresh (browserHistory -> hashHistory) (0.1.8)
  * You cannot PUSH the same path using hash history, hashHistory return empty {} (0.1.9)
  * Rechart (DRC component) prop pop wrong RESTful modal (0.1.13)
  * CSS not found (0.1.14)
  * Stencil hint tag overlay on prop tab (0.1.16)
  * Stencil preview img are gone (0.1.19)

## Added
  * Logo (0.1.7)
  * Stencil
    - PlainTable (0.1.1), but could not set props
    - PlainTable provide set RESTful API (0.1.10)
    - Gridlayout provide style modify (0.1.11)
  * Prop CSS
    - background-image (0.1.2)
    - background-position (0.1.2)
    - background-repeat (0.1.2)
    - background-size (0.1.2)
    - font-family (0.1.3)
    - font-family show real format in dropdown menu (0.1.17)
  * RadioButton and ListItem cannot be draggable, use move upward/downward buttons to change their order (0.1.5)
  * Add piwikLogger middleware to log ADD_STENCIL action with stencil namespace & name (0.1.8)
  * Tab CSS (0.1.12)
    - list stencil style keys that could be modify
    - codes by user in free way (JavaScript style - ACE editor)
    - codes will overwrite list css setting (if set with the same key)
    - component: 'css-color-textfield' apply and test with Block stencil (0.1.15)
    - component: 'css color picker & css unit' are test ok (0.1.15)
  * Add more props to existing 5 Recharts (AreaChart, BarChart, LineChart, Pie, Scatter) (0.1.20)
  * Add new type of Recharts: ComposedChart, RadarChart, RadialBarChart (0.1.21)

## Changed
  * Change Rechart to DRC(DRC react components) style (0.1.9)
  * Base stencil & Root_div use new props tab (0.1.16)
  * Upgrade material-ui 0.15.4 -> 0.18.7 (0.1.18)
  * Inkbar of Stencil's props tab use global material-ui theme (0.1.18)
  * Material-UI stencil use new props-tab (0.1.18)
    - AppBar
    - Auto Complete


# 0.1.0 (July 04, 2017) 🎉
## Fixed
  * Appbar size too large when load json back
  * Text: using div instead of span
  * List setting disappears if open icon editor modal
  * Load json back fails
    - icon converts issue
    - date/time converts issue
  * Export html fails: icon converts issue
  * GridLayout
    - 9 position (dependent on flex-direction value)
  * Switch GridLayout props editor and Stencil props editor, won't show both at the same time

## Added
  * Double click yellow hint tag on component will also show props editor
  * Stencil - Text using div instead of span
  * GridLayout supports column padding setting
  * Uses image value for Col Direction and Content Position inside GridLayout props editor
  * Load json back fails
    - icon convert issue
    - date/time convert issue
  * Add favicon.ico
  * Add dependencies lib & upgrade (for importing table)
    - drc.atoms.table": "0.0.30"
    - prop-types": "^15.5.10"
    - react": "^15.6.1"
    - react-dom": "^15.3.0"
    - react-tap-event-plugin": "^2.0.0"

## Removed
  * Selected stencil style (dotted line) in canvas


# 0.0.9 (June 19, 2017) 🎉
## Fixed
  * Left Stencil list unexpected displacement when scroll bar shows
  * Tune drag & drop timing
  * Container can be put to another container, ex: GridLayout
  * Drop is easier, remove the limitation: drop component must be larger than drag component
  * Drag component disappears when dropped on itself
  * Unable to see Rechart after exporting if didn't assign URL, give it a default URL
  * Failed to execute 'btoa' on 'Window' if contains Chinese

## Added
  * All modal can be closed by ESC key
  * CSS add
    - direction
    - line-height
    - letter-spacing
    - text-align
    - text-decoration
    - text-indent
    - text-shadow
    - text-transform
    - white-space
    - word-spacing
    - font-size
    - font-style
    - font-variant
    - font-weight
  * Deploy to Server
    - provide a default web position
    - hint user url by toasting message
  * Add RTChart stencil preview
  * Add CSS overflow to drop container to show scroll bar
  * Add hint color to drop container
  * GridLayout can overwrite default CSS
  * Add component name tag when hover on it
  * Add clone and link clone to stencil
  * Add check to page name, and cannot have two pages with same name
  * Donut Chart (Rechart - PieChart)


# 0.0.8 (June 3, 2017) 🎉
## Fixed
  * Auto deploy - wrong path router
  * Auto deploy - add token (hard code - key 'MP_token')
  * Auto deploy - header token insert fail (remove no-cors fetch setting)
  * Cannot delete props inside right drawer by clicking trash icon
  * Exporting HTML with icons fails

## Canvas
  * Preview mode is fullscreen now, remove all rounded corners for consistency

## Added
 * Material-UI - List
 * Stencil Template - some UI with preview
 * GridLayout
    - could setting by UI
    - preview ok, remove hint style
    - scale size by one column
    - height by one column
    - content align position in a column
    - a column align other column position in row
    - arrange content view in row or column way
    - resize
    - remove hint style when preview or deploy mode
    - could put any component in any col


# 0.0.7 (May 11, 2017) 🎉
## Fixed
  * ReChart causes error "cannot read property 'length' of undefined" when preview mode
  * RTChart causes error "cannot read property 'subscribe' of null" if haven't set up MQTT when preview mode
  * RTChart causes error "props.dataTransformer.transformer is not a function" when switch to preview mode without editing
  * Default transformer funciton of RTChart/ReChart is bundled by Webpack
  * The surrounded line of chosen stencil is not consistent
  * If the activity props is set before property setting, its setting will disappear, need to set again
  * Cannot switch pages of exporting HTML

## Toolbar
  * Deploy to server

## Changed
  * Disable ReChart submit button if URL is empty

## Added
  * **RTChart**
   - Gauge Chart
  * Width and height of RTChart can be edited
  * XAxis/YAxis label of RTChart/ReChart can be edited


# 0.0.6 (April 19, 2017) 🎉
## Fixed
  * RTChart suspends rendering when change browser tab
  * RTChart don't render when same data with different datetime
  * RTChart min & max can use float value
  * Icon props info of Avatar/FlatButton/RaisedButton is missing when saved to JSON
  * Icon of Avatar/FlatButton/RaisedButton cause crash when export to HTML
  * Fixed wrong deploying site path by exporting HTML

## Added
  * Web server files


# 0.0.5 (March 28, 2017) 🎉
## Fixed
  * Minified the size of exporting HTML folder
  * Fixed Switches/Date Picker/Time Picker cannot be dragged
  * Fixed icon of Floating Action Button can be dragged
  * Fixed icon of Floating Action Button/Icon Button cannot be edited
  * Fixed Linear Progress cannot be chosen
  * **Drawer**
   - Fixed if too many property rows on the drawer, the check & close buttons are hidden
   - Icon picker displays wrong and applies wrong

## Upgraded
  * react-dnd: 2.2.4
  * react-dnd-html5-backend: 2.2.4

## Added
  * **RTChart**
   - PROPERTY: add min/max of yAxis, upper bound, lower bound
  * **Drawer**
   - PROPERTY: supports icon picker
     - Avatar
     - FlatButton
     - Icons
     - RaisedButton


# 0.0.4 (March 10, 2017) 🎉
## Fixed
  * preview mode
    * screen shaking unexpectedly and has x-scrollbar and y-scrollbar
  * some stencil could not delete clearly
  * icon stencil could delete

## Added
  * **Rechart**
   - AreaChart
   - BarChart
   - LineChart
   - PieChart
   - ScatterChart

  * **Material UI**
   - Menu (but could not modify content)
   - Date Picker: could modify property
   - Time Picker: could modify property

  * **Canvas**
   - highlight [click] selected stencil (with dashed line)
   - highlight [double click] selected stencil (with solid line)

  * **Drawer**
   - PROPERTY: for MaterialUI stencil, supports input type
     - type - any (array, string, number, json object, funciton, boolean value are ok)
     - type - array
     - type - boolean
     - type - enum
     - type - node
     - type - number
     - type - propTypes
     - type - string
     - if empty field, it will be deleted by click confirm button
     - supports color picker
     - style and element classify and sort by alphabetical

  * **DnDStencil**
   - Wrap every stencil with a div to separate onDoubleClick event


# 0.0.3 (February 08, 2017) 🎉
## Fixed
  * Fixed minified transformer function for webpack production
  * Fixed transformer function of app.json is missing after export
  * Fixed transformer function is string (should be funciton) after load from JSON

## Changed
  * Improved hint message of RTChart dataTransformer edit modal
  * Upgraded RTChart version

## Added
  * **Toolbar**
   - Save JSON


# 0.0.2 (February 06, 2017) 🎉
## Toolbar
  * Clone stencil
  * MQTT setup

## Stencil Template
  * RTChart
    * rt-line
    * rt-spline
    * rt-step
    * rt-area
    * rt-area-spline
    * rt-area-step
    * rt-bar
    * supports transformer function, receives mqtt data, and provides hint
  * <del>Highcharts : remove this feature</del>
  * Base : html
    * Block : div tag
    * Heading 1 :  h1 tag
    * Heading 2 :  h2 tag
    * Heading 3 :  h3 tag
    * Heading 4 :  h4 tag
    * Heading 5 :  h5 tag
    * Heading 6 :  h6 tag
    * Image : img tag
    * Paragraph : p tag
    * Text : span tag

## Drawer
  * PROPERTY : for MaterialUI stencil
    * STYLE : selected item will remove
    * ELEMENT : supports now and selected item will remove
      * type - checkbox : enable
      * type - enum : list enable (select menu)
      * type - string : enabele
      * type - number : enabele
      * type - required : disabled delete function
      * type - children : could modify text


# 0.0.1 (January 04, 2017) 🎉
  * Initial public release

## Toolbar
  * Delete stencil
  * Save (Export)
  * Load (Import)
  * Preview / Edit mode

## Drawer
  * PROPERTY : only style
  * ACTIVITY : default click event

## Canvas
  * DnD some stencils

## Page Manager
  * Create new one
  * Delete current
  * Clone current
  * Edit current

## Router Manager

## Stencil Template
  * Recharts : not yet
  * React Flexbox : not yet
  * MaterialUI
    * App Bar : with default present, could not modify content
    * Auto Complete
    * Avatar : no image
    * Badge
    * Buttons : with default present, could not modify content
    * Card : with default present, could not modify content
    * Date Picker : with default present, could not modify content
    * Chip : with default present, could not add avatar
    * Divider
    * Icons : use svg icon, could not change icon now
    * Paper
    * Progress
    * Select Field : cound not modify content
    * Tabs : with default present, could not add avatar
    * Text Field
    * Time Picker : with default present, could not modify content
  * HTML
    * div
