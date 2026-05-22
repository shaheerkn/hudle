(function () {
  var featuresSection = document.querySelector('.features');
  if (!featuresSection) return;

  var sourcePanel = document.getElementById('features-panel-talentpool');
  var cloneTabs = ['profielen', 'recruitment', 'compliance'];

  function stripCloneAttributes(node) {
    node.querySelectorAll('[data-aos]').forEach(function (el) {
      el.removeAttribute('data-aos');
      el.removeAttribute('data-aos-delay');
      el.removeAttribute('data-aos-duration');
    });
  }

  if (sourcePanel) {
    cloneTabs.forEach(function (tabId) {
      var panel = document.getElementById('features-panel-' + tabId);
      if (!panel || panel.childElementCount > 0) return;

      sourcePanel.childNodes.forEach(function (child) {
        panel.appendChild(child.cloneNode(true));
      });

      stripCloneAttributes(panel);
    });
  }

  var tabs = featuresSection.querySelectorAll('.features__tabs .audiences__tab');
  var panels = featuresSection.querySelectorAll('.features__panel');

  function activateTab(tabId) {
    tabs.forEach(function (tab) {
      var isActive = tab.dataset.tab === tabId;
      tab.classList.toggle('audiences__tab--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var isActive = panel.dataset.tabPanel === tabId;
      panel.classList.toggle('features__panel--active', isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.dataset.tab);
    });
  });
})();
