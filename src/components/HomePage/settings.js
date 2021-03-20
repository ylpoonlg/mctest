class McSettings {
    constructor() {
        this.baseSettings = {
            "settings_dd": false,
            "auto_next_q": true
        };
    }

    getSettings() {
        const settings = localStorage.mc_settings;
        if (!settings) {
            return this.baseSettings;
        }
        return JSON.parse(settings);
    }

    getSetting(setting) {
        let settings = this.getSettings();
        return settings[setting];
    }

    setSettings(setting, value) {
        let settings = this.getSettings();
        settings[setting] = value;
        localStorage.mc_settings = JSON.stringify(settings);
    }
}

export default McSettings;