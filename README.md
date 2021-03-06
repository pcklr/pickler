# pickler

Turn your React+Jest+Enzyme unit tests into Gherkin.

# Overview

Pickler is a tool which allows one to convert their unit tests into Gherkin. It was developed with the need to meet a job requirement which was to write all requirements in Gherkin so they could be both requirement documentation and functional tests.

# How it Works

The pickler tool will parse your unit tests and convert them to Gherkin using this basic approach:

```
describe('As a user, I want to pickle my cucumbers, so that I can eat pickles', () => {
  // 🥒 Scenario: As a user, I want to pickle my cucumbers, so that I can eat pickles

  it('should have a jar of water, salt, and enzymes', () => {
  // 🥒 Given I should have a jar of salt water and enzymes

    const water = '1 pint';
    const salt = '1 cup';
    const enzymes = '1 tbsp';
    const cucumbers = '5';

    const wrapper = shallow(<PickleJar water={water} salt={salt} enzymes={enzymes} cucumbers={cucumbers}/>);
    // 🥒 And I gather water, salt, enzymes, and cucumbers to PickleJar

    wrapper.find('btn.add-water').simulate('click')
    // 🥒 When I click "btn.add-water"
    wrapper.find('btn.add-salt').simulate('click')
    // 🥒 And I click "btn.add-salt"
    wrapper.find('btn.add-enzymes').simulate('click')
    // 🥒 And I click "btn.add-enzymes"
    wrapper.find('btn.stir').simulate('click')
    // 🥒 And I click "btn.stir"
    wrapper.find('btn.add-cucumbers').simulate('click')
    // 🥒 And I click "btn.add-cucumbers"

    expect(wrapper.find('ul.jar-contents').containsAllMatchingElements([
      `<li>1 pint of water</li>`,
      // 🥒 Then I expect "ul.jar-contents" to contain "<li>1 pint of water</li>"
      `<li>1 cup of salt</li>`,
      // 🥒 And I expect "ul.jar-contents" to contain "<li>1 cup of salt</li>"
      `<li>1 tbsp of enzymes</li>`,
      // 🥒 And I expect "ul.jar-contents" to contain "<li>1 tbsp of enzymes</li>"
      `<li>5 cucumbers</li>`
      // 🥒 And I expect "ul.jar-contents" to contain "<li>5 cucumbers</li>"
    ])
  })
})
```

# Install

```
npm -g install pickler

# or

yarn global add pickler
```

# Usage

See [man](bin/src/help.md)
