module.exports = {
  presets: ["@vue/app"],
  plugins: [
    ["import", 
      {
        "libraryName": "mand-mobile",
        "libraryDirectory": "lib"
      }
    ],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
