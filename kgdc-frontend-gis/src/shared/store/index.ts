import State from 'ol/source/State';
import { createStore } from 'vuex'

export default createStore({
  state: {
    mapObj: {},
    usersModuleWSS: 'ws://localhost:3010',
    gjModuleWSS: 'ws://localhost:3020',
    abadiModuleWSS: 'ws://localhost:3030',
    fileGetPostServerModule: 'http://localhost:4010',
    filesListApproveModuleWSS: 'ws://localhost:4020',
    districtsList: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru (Rural)', 'Bengaluru (Urban)', 'Bidar', 'Chamarajanagara', 'Chikkaballapura', 'Chikkamagaluru', 'Chitradurga', 'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan', 'Haveri', 'Kalburgi', 'Kodagu', 'Kolara', 'Koppal', 'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga', 'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'],
    globaltoastmsg: '',
    globaltoastEl: null,
    isLoggedIn: false,
    username: '',
    password: '',
    userDetails: '',
    roles: '',
    karnboundsLoaded: false,
    villagesBoundsLoaded: false,
    abadiLimitsLoaded: false,
    attributesData: [],
    currentabadi: 'None Selected',
    currentvillage: 'None',
    currentabadiuuid: '',
    currentuniquevillagecode: '',
    currentvillagedetails: {},
    lineMeasureEnabled: false,
    areaMeasureEnabled: false,
    featuresCounter: 0,
    featuresData: [],
    showUserBox: false,
    showFilesUploader: false,
    showFilesLoader: false,
    fileUploadProgress: 0,
    uploadbtndisabled: false,
    filesList: [],
  },
  getters: {
    getMapObj(state){
      return state.mapObj;
    },
    getUsersModuleWSS(state){
      return state.usersModuleWSS;
    },
    getGJModuleWSS(state){
      return state.gjModuleWSS;
    },
    getAbadiModuleWSS(state){
      return state.abadiModuleWSS;
    },
    getFileGetPostServerModule(state){
      return state.fileGetPostServerModule;
    },
    getFileListApproverServerModule(state){
      return state.filesListApproveModuleWSS;
    },
    getDistrictsList(state){
      return state.districtsList;
    },
    getGlobalToastMsg(state){
      return state.globaltoastmsg;
    },
    getGlobalToastEl(state){
      return state.globaltoastEl;
    },
    getLoggedIn(state){
      return state.isLoggedIn;
    },
    getUsername(state){
      return state.username;
    },
    getPassword(state){
      return state.password;
    },
    getUserRoles(state){
      return state.roles;
    },
    getUserDetails(state){
      return state.userDetails;
    },
    getKarnBoundsLoaded(state){
      return state.karnboundsLoaded;
    },
    getVillagesBoundsLoaded(state){
      return state.villagesBoundsLoaded;
    },
    getAbadiLimitsLoaded(state){
      return state.abadiLimitsLoaded;
    },
    getAttributesData(state){
      return state.attributesData;
    },
    getCurrentVillage(state){
      return state.currentvillage;
    },
    getCurrentUniqueVillageCode(state){
      return state.currentuniquevillagecode;
    },
    getCurrentVillageDetails(state){
      return state.currentvillagedetails;
    },
    getCurrentAbadiLimit(state){
      return state.currentabadi;
    },
    getCurrentAbadiUUID(state){
      return state.currentabadiuuid;
    },
    getLineMeasureEnabled(state){
      return state.lineMeasureEnabled;
    },
    getAreaMeasureEnabled(state){
      return state.areaMeasureEnabled;
    },
    getFeaturesCounter(state){
      return state.featuresCounter;
    },
    getFeaturesData(state){
      return state.featuresData;
    },
    getShowUserBox(state){
      return state.showUserBox;
    },
    getShowFilesUploader(state){
      return state.showFilesUploader;
    },
    getShowFilesLoader(state){
      return state.showFilesLoader;
    },
    getFileUploadProgress(state){
      return state.fileUploadProgress;
    },
    getUploadBtnDisabled(state){
      return state.uploadbtndisabled;
    },
    getFilesList(state){
      return state.filesList;
    },
  },
  mutations: {
    setMapObj(state, mapObj){
      state.mapObj = mapObj;
    },
    setGlobalToastEl(state, El){
      state.globaltoastEl = El;
    },
    setGlobalToastMsg(state, msg){
      state.globaltoastmsg = msg;
    },
    setLoggedIn(state, isLoggedIn){
      state.isLoggedIn = isLoggedIn;
    },
    setGlobalUsename(state, username){
      state.username = username;
    },
    setGlobalPassword(state, password){
      state.password = password;
    },
    setUserRoles(state, roles){
      state.roles = roles;
    },
    setUserDetails(state, userDetails){
      state.userDetails = userDetails;
    },
    setKarnBoundsLoaded(state, karnboundsLoaded){
      state.karnboundsLoaded = karnboundsLoaded;
    },
    setVillageBoundsLoaded(state, villageBoundsLoaded){
      state.villagesBoundsLoaded = villageBoundsLoaded;
    },
    setAbadiLimitsLoaded(state, abadiLimitsLoaded){
      state.abadiLimitsLoaded = abadiLimitsLoaded;
    },
    setAttributesData(state, attributesData){
      state.attributesData = attributesData;
    },
    setCurrentVillage(state, currentvillage){
      state.currentvillage = currentvillage;
    },
    setUniqueVillageCode(state, currentuniquevillagecode){
      state.currentuniquevillagecode = currentuniquevillagecode;
    },
    setCurrentVillageDetails(state, villagedetails){
      state.currentvillagedetails = villagedetails;
    },
    setCurrentAbadiLimit(state, abadilimit){
      state.currentabadi = abadilimit;
    },
    setCurrentAbadiUUID(state, abadiuuid){
      state.currentabadiuuid = abadiuuid;
    },
    setLineMeasureEnabled(state, enabled){
      state.lineMeasureEnabled = enabled;
    },
    setAreaMeasureEnabled(state, enabled){
      state.areaMeasureEnabled = enabled;
    },
    setFeatureCounter(state, counter){
      state.featuresCounter = counter;
    },
    setFeaturesData(state, featuresData){
      state.featuresData = featuresData;
    },
    setShowUserBox(state, toShow){
      state.showUserBox = toShow;
    },
    setShowFilesUploader(state, toShow){
      state.showFilesUploader = toShow;
    },
    setShowFilesLoader(state, toShow){
      state.showFilesLoader = toShow;
    },
    setFileUploadProgress(state, progress){
      state.fileUploadProgress = progress;
    },
    setUploadBtnDisabled(state, status){
      state.uploadbtndisabled = status;
    },
    setFilesList(state, filesList){
      state.filesList = filesList;
    },
  },
  actions: {
    setMapObj(context, mapObj){
      context.commit('setMapObj', mapObj);
    },
    setSocketClient(context, wsClient){
      context.commit('setSocketClient', wsClient);
    },
    setCategoryInfo(context, info){
      context.commit('setCategoryInfo', info);
    },
    setGlobalToastEl(context, El){
      context.commit('setGlobalToastEl', El);
    },
    setGlobalToastMsg(context, msg){
      context.commit('setGlobalToastMsg', msg);
    },
    setLoggedIn(context, isLoggedIn){
      context.commit('setLoggedIn', isLoggedIn);
    },
    setGlobalUsename(context, username){
      context.commit('setGlobalUsename', username);
    },
    setGlobalPassword(context, password){
      context.commit('setGlobalPassword', password);
    },
    setUserRoles(context, roles){
      context.commit('setUserRoles', roles);
    },
    setUserDetails(context, userDetails){
      context.commit('setUserDetails', userDetails);
    },
    setKarnBoundsLoaded(context, karnboundsLoaded){
      context.commit('setKarnBoundsLoaded', karnboundsLoaded);
    },
    setVillageBoundsLoaded(context, villagesBoundsLoaded){
      context.commit('setVillageBoundsLoaded', villagesBoundsLoaded);
    },
    setAbadiLimitsLoaded(context, abadiLimitsLoaded){
      context.commit('setAbadiLimitsLoaded', abadiLimitsLoaded);
    },
    setAttributesData(context, attributesData){
      context.commit('setAttributesData', attributesData);
    },
    setCurrentVillage(context, currentvillage){
      context.commit('setCurrentVillage', currentvillage);
    },
    setUniqueVillageCode(context, currentlgd){
      context.commit('setUniqueVillageCode', currentlgd);
    },
    setCurrentVillageDetails(context, villagedetails){
      context.commit('setCurrentVillageDetails', villagedetails);
    },
    setCurrentAbadiLimit(context, abadilimit){
      context.commit('setCurrentAbadiLimit', abadilimit);
    },
    setCurrentAbadiUUID(context, abadiuuid){
      context.commit('setCurrentAbadiUUID', abadiuuid);
    },
    setLineMeasureEnabled(context, enabled){
      context.commit('setLineMeasureEnabled', enabled);
    },
    setAreaMeasureEnabled(context, enabled){
      context.commit('setAreaMeasureEnabled', enabled);
    },
    setFeatureCounter(context, counter){
      context.commit('setFeatureCounter', counter);
    },
    setFeaturesData(context, featuresData){
      context.commit('setFeaturesData', featuresData);
    },
    setShowUserBox(context, toShow){
      context.commit('setShowUserBox', toShow);
    },
    setShowFilesUploader(context, toShow){
      context.commit('setShowFilesUploader', toShow);
    },
    setShowFilesLoader(context, toShow){
      context.commit('setShowFilesLoader', toShow);
    },
    setFileUploadProgress(context, progress){
      context.commit('setFileUploadProgress', progress);
    },
    setUploadBtnDisabled(context, status){
      context.commit('setUploadBtnDisabled', status);
    },
    setFilesList(context, filesList){
      context.commit('setFilesList', filesList);
    },
  },
  modules: {
  }
})