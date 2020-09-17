/* Magic Mirror
 * Module: HelloWorld
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 */
Module.register("health", {
  // Default module config.
  defaults: {
    weights: [
      {
        date: "2020-09-08",
        weight: 140
      },
      {
        date: "2020-09-09",
        weight: 142
      },
    ]
  },

  getStyles: function() {
    return [
      "health_styles.css",
      "http://ajax.googleapis.com/ajax/libs/jqueryui/1.12.0/themes/ui-lightness/jquery-ui.css",
      "keyboard.min.css"
    ];
  },

  getScripts: function() {
    return [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
      this.file("js/jquery.keyboard.js"),
      this.file("js/health_script.js"),
    ];
  },

  getDataDiv: function() {
    var data = document.createElement("div");
    var weights = document.createElement("span");
    for (var weight of this.config.weights) {
      weights.appendChild(document.createTextNode(weight.date + ": " + weight.weight));
      weights.appendChild(document.createElement("br"));
    }
    data.appendChild(weights);
    return data;
  },

  getExitDiv: function() {
    var exit = document.createElement("div");
    exit.className = "exit-button bright";

    exit.appendChild(document.createTextNode("Exit"));

    return exit;
  },

  getInputDiv: function(exit) {
    // Title
    var title = document.createElement("div");
    title.className = "health-title bright large";
    title.appendChild(document.createTextNode("Today's Measurements"));

    // Weight

    var weightInput = document.createElement("input")
    weightInput.id = "weight-input";
    weightInput.className = "health-input";
    weightInput.inputType = "number";

    var weightLabel = document.createElement("label");
    weightLabel.className = "health-label bright light";
    weightLabel.for = "weight-intput";
    weightLabel.appendChild(document.createTextNode("Weight"));

    var weightBox = document.createElement("div");
    weightBox.className = "weight-box";
    weightBox.appendChild(weightLabel);
    weightBox.appendChild(weightInput);

    // Body Fat

    var bodyFatInput = document.createElement("input")
    bodyFatInput.id = "body-fat-input";
    bodyFatInput.className = "health-input";
    bodyFatInput.inputType = "number";

    var bodyFatLabel = document.createElement("label");
    bodyFatLabel.className = "health-label bright light";
    bodyFatLabel.for = "body-fat-input";
    bodyFatLabel.appendChild(document.createTextNode("Body Fat %"));

    var bodyFatBox = document.createElement("div");
    bodyFatBox.className = "body-fat-box";
    bodyFatBox.appendChild(bodyFatLabel);
    bodyFatBox.appendChild(bodyFatInput);

    // Putting it all together

    var input = document.createElement("div");
    input.className = "focus-pane";

    input.appendChild(exit);
    input.appendChild(title);
    input.appendChild(weightBox);
    input.appendChild(bodyFatBox);

    function registerKeyboard(name) {
      $(function() {
        $('#' + name).keyboard({
          layout: 'custom',
          customLayout: {
            'normal': [
              '7 8 9',
              '4 5 6',
              '1 2 3',
              '0 . {bksp}',
              '{c} {a}'
            ]
          },
          restrictInput: true
        });
      });
    }
    registerKeyboard("weight-input");
    registerKeyboard("body-fat-input");
    //$('#keyboard').getkeyboard();
    //$('#keyboard').getkeyboard().reveal();
    //$('#keyboard').keyboard({});
    //$('#keyboard').getkeyboard();
    //$('#keyboard').getkeyboard().reveal();

    return input;
  },

  getDom: function () {
    var data = this.getDataDiv();
    var exit = this.getExitDiv();
    var input = this.getInputDiv(exit);
    input.style.display = "none";

    function showInput() {
      input.style.display = "block";
    }
    data.addEventListener("click", () => showInput());

    function hideInput() {
      input.style.display = "none";
    }
    exit.addEventListener("click", () => hideInput());

    var dom = document.createElement("div");
    dom.appendChild(data);
    dom.appendChild(input);
    return dom;
  },
});
