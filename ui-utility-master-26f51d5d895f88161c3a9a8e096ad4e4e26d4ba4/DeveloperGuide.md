Developer Guide
==========  
## 1. Get source code
```
git clone http://TWTPESIR01.delta.corp/react/ui-utility.git
```
## 2. Set npm config
SSIR maintains private modules under [sinopia](http://10.136.225.86:3010/),
remember to set npm config to install those modules.  
```
npm config set registry http://10.136.225.86:3010/
```
Reset to default setting
```
npm config set registry https://registry.npmjs.org/
```

## 3. Install modules
```
npm install
```
This takes about 5 minutes to install all dependent modules.

## 4. VPN
If you are connecting to **[SSIR's Mac Pro](http://twtpesir01.delta.corp/ssir-group/assets#mac-pro)**, you don't need to set up VPN.  
[Staging](http://10.120.136.90/staging/ui-utility/) and [Production](http://10.120.136.90/ui-utility) are both behind [VPN](https://vpn.deltaww.com).  
Some materials can be accessed without VPN,
but probably still need to connect to Delta-Office AP.

## 5. Run
```
npm run dev
```
Then connect to `localhost:8080`

## Note
### Modules host under [Sinopia](http://10.136.225.86:3010/) 
- [drc.atoms](http://twtpesir01.delta.corp/react/drc)
- [react-native-material-color](http://twtpesir01.delta.corp/react-native/react-native-material-color)
- [react-real-time-chart](http://twtpesir01.delta.corp/react/react-real-time-chart)
- [ui-utility-core](http://twtpesir01.delta.corp/react/ui-utility-core)
- [ui-utility-code-generator](http://twtpesir01.delta.corp/react/ui-utility-code-generator)
