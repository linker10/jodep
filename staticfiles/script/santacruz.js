var /* const */ TREETYPE = 0;
var /* const */ PARENTCODE = 1;
var /* const */ BOXCODE = 2;
var /* const */ SPLITCHAR = '_';

function applyhidden(treeType, hiddenElem)
{
  var aInputs = document.getElementsByTagName('input');
  var codeCompare;
  var i;
  var hiddenValues = new Array();

  /* needed 'cause when split invoked on empty string, it returns array with 1 element that's empty */

  if (hiddenElem.value > '')
  {
    hiddenValues = hiddenElem.value.split(',')
  }
  else
  {
    return;
  }

  for(i = 0; i < aInputs.length; i++)
  {
    if (aInputs[i].type == 'checkbox' && aInputs[i].id.split(SPLITCHAR)[TREETYPE] == treeType)
    {
      codeCompare = aInputs[i].id.split(SPLITCHAR)[BOXCODE];
      if (arrayIndexOf(hiddenValues, codeCompare) >= 0)
      {
        aInputs[i].checked = true;
      }
    }
  }
}

function checksubs(cb)
{
  var aInputs = document.getElementsByTagName('input');
  var cbState = cb.checked;
  var i, j, k;
  var aToCheck = new Array();
  var aToCheckUp = new Array();
  var treeType = cb.id.split(SPLITCHAR)[TREETYPE];
  var codeStart = cb.id.split(SPLITCHAR)[BOXCODE];
  var codeStartUp = cb.id.split(SPLITCHAR)[PARENTCODE];
  var codeCompare;
  
  var hiddenElem = getHiddenElement(treeType + 'Values');
  var hiddenValues = new Array();

  /* needed 'cause when split invoked on empty string, it returns array with 1 element that's empty */
  if (hiddenElem.value > '')
  {
    hiddenValues = hiddenElem.value.split(',');
  }

  /* 1st, make sure that the element clicked gets added/removed from the hidden input value */
  UpdateHidden(hiddenValues, cbState, codeStart);

  /* going down, initially, we're looking for sub-elements just one level below  
     the one clicked, whose parent code equals the code of the element clicked */
  j = 0;
  for (i = 0; i < aInputs.length; i++)
  {
    /* to qualify the input element, it must be a checkbox and its id must start with the same string as the element passed */
    if (aInputs[i].type == 'checkbox' && aInputs[i].id.split(SPLITCHAR)[TREETYPE] == treeType)
    {
      /* get this element's parent code */
      codeCompare = aInputs[ i ].id.split(SPLITCHAR)[PARENTCODE];
      if (codeCompare == codeStart)
      {
        /* if the clicked-element code matches the parent code of aInputs[i] element we will a) change its state,
           b) added to the list of items changed and c) make sure that hidden input is updated */
        aInputs[i].checked = cbState;
        aToCheck[j++] = aInputs[i];
        UpdateHidden(hiddenValues, cbState, aInputs[i].id.split(SPLITCHAR)[BOXCODE]);
      }
    }
  }
  
  j = 0;
  while (aToCheck.length > 0)
  {
    /* if any sub-elements were found earlier, we need to see if they "parent" any themselves
       for that, we will traverse array aToCheck, populated earlier. Any sub-element found here
       will also be added to the bottom of this array so the while-loop will continue until
       all aToCheck added before and all aToCheck added here have been processed */
    codeStart = aToCheck[j].id.split(SPLITCHAR)[BOXCODE];   
    for (i = 0; i < aInputs.length; i++)
    {
      if (aInputs[i].type == 'checkbox' && aInputs[i].id.split(SPLITCHAR)[TREETYPE] == treeType)
      {
        /* again, is this element's parent code equal to the code for aToCheck element? */
        codeCompare = aInputs[i].id.split(SPLITCHAR)[PARENTCODE];

        if (codeCompare == codeStart)
        {
          aInputs[i].checked = cbState;
          aToCheck[aToCheck.length] = aInputs[i];
          UpdateHidden(hiddenValues, cbState, aInputs[i].id.split(SPLITCHAR)[BOXCODE]);
        }
      }
    }

    j++;
    if (j >= aToCheck.length)
    {
      break;
    }
  }

  /* walk up - ONLY if cbState is checked. unchecking should not be propagated up */
  if (cbState)
  {
    /* in this "paragraph", we're looking for element "above" the one that was clicked, the elements
       above are those whose code matches the parent code of the clicked element */
    j = 0;
    for (i = 0; i < aInputs.length; i++)
    {
      if (aInputs[i].type == 'checkbox' && aInputs[i].id.split(SPLITCHAR)[TREETYPE] == treeType)
      {
        codeCompare = aInputs[i].id.split(SPLITCHAR)[BOXCODE];

        if (codeCompare == codeStartUp)
        {
          aInputs[i].checked = cbState;
          aToCheckUp[j++] = aInputs[i];
          UpdateHidden(hiddenValues, cbState, codeCompare);
        }
      }
    }

    /* this loop is similar to the one walking down and it, basically, continues the climb */  
    j = 0;
    while (aToCheckUp.length > 0)
    {
      codeStartUp = aToCheckUp[j].id.split(SPLITCHAR)[PARENTCODE];
      for (i = 0; i < aInputs.length; i++)
      {
        if (aInputs[i].type == 'checkbox' && aInputs[i].id.split(SPLITCHAR)[TREETYPE] == treeType)
        {
          codeCompare = aInputs[i].id.split(SPLITCHAR)[BOXCODE];
          if (codeCompare == codeStartUp)
          {
            aInputs[i].checked = cbState;
            aToCheckUp[aToCheckUp.length] = aInputs[i];
            UpdateHidden(hiddenValues, cbState, codeCompare);
          }
        }
      }

     j++;
     if (j >= aToCheckUp.length)
       break;
    }
  }

  /* make sure that string is sorted properly */
  hiddenValues.sort(sortNumber);
  /* ... and write the string array back to the input element */
  hiddenElem.value = hiddenValues.toString();
}

function getHiddenElement(elemID)
{
  var aElems = document.getElementsByTagName('input');
  var i;
  var ret = null;

  for (i = 0; i < aElems.length; i++)
  {
    if (aElems[i].id.indexOf(elemID) >= 0)
    {
      ret = aElems[i];
      break;
    }
  }
  return ret;
}

function arrayIndexOf(arr, value)
{
  var ret = -1;
  for (i = 0; i < arr.length; i++)
  {
    if (arr[i] == value)
    {
      ret = i;
      break;
    }
  }
  return ret;
}
function UpdateHidden(arr, state, code)
{
  var k = arrayIndexOf(arr, code);
  if (state && k < 0)     // needs to be added to array
  {
    arr[arr.length] = code;
  }
  if (! state && k >= 0)  // exists but needs to be removed
  {
    arr.splice(k, 1);
  }
}

function sortNumber(a, b)
{
  return a - b
}

function getElementByPartialName(elemID, elemType)
{
  var i;
  var ret = null;
  var aElems = document.getElementsByTagName(elemType);

  for (i = 0; i < aElems.length; i++)
  {
    if (aElems[i].id.indexOf(elemID) >= 0)
    {
      ret = aElems[i];
      break;
    }
  }
  return ret;
}