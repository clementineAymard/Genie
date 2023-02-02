'use strict'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null
const STORAGE_KEY = 'questTreeDB'

function createQuestsTree() {
  gQuestsTree = loadFromStorage(STORAGE_KEY)

  if (!gQuestsTree) {
    gQuestsTree = createQuest('Male?')
    gQuestsTree.yes = createQuest('Gandhi')
    gQuestsTree.no = createQuest('Rita')
    saveToStorage(STORAGE_KEY, gQuestsTree)
  }

  gCurrQuest = gQuestsTree
  gPrevQuest = null


}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // Create and Connect the 2 Quests to the questions tree
  var temp = gCurrQuest.txt
  // console.log('gCurrQuest:', gCurrQuest)
  gCurrQuest.txt = newQuestTxt 
  gCurrQuest.yes = createQuest(newGuessTxt)
  gCurrQuest.no = createQuest(temp)

  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function getCurrQuest() {
  return gCurrQuest
}
