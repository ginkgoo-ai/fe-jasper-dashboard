// 全局变量管理器
class GlobalManager {
  static instance: null | GlobalManager = null;

  siteName = "Contractor AI";
  siteDescription = "Contractor AI";
  static getInstance() {
    if (!this.instance) {
      this.instance = new GlobalManager();
    }
    return this.instance;
  }
}

export default GlobalManager.getInstance();
