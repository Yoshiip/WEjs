
const MainEditor = {
    autoGenerate: false,
    setTab: (tabName) => {
        graphTab.style.display = tabName == "graph" ? 'flex' : 'none';
        webTab.style.display = tabName == "web" ? 'flex' : 'none';
    },
    openOsmPanel: () => {
        osmPanel.style.display = "block";
    },
    closeOsmPanel: () => {
        osmPanel.style.display = "none";
    },
    update3dMode: () => {
        world.enable3d = !world.enable3d;
    },
    updateAutoGenerate: () => {
        this.autoGenerate = !this.autoGenerate;
        generateButton.style.display = autoGenerate ? "none" : "inherit";
        autoGenerateCheckbox.checked = this.autoGenerate;
    }
}

MainEditor.updateAutoGenerate();