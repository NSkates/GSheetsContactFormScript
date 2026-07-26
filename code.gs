var sheetName = 'contactForm'
var scriptProp = PropertiesService.getScriptProperties()

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    if (!scriptProp.getProperty('key')) {
      var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
      scriptProp.setProperty('key', activeSpreadsheet.getId())
    }

    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]

    // Insert a new blank row right after the header row
    sheet.insertRowAfter(1)
    var targetRow = 2

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(targetRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': targetRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
