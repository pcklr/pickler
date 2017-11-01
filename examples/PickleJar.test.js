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
    ])).to.equal(true)
  })
})
