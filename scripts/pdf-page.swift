// Renders one page of a PDF to PNG at a target pixel width.
// Usage: swift pdf-page.swift <input.pdf> <page (1-based)> <output.png> <width>
import Foundation
import PDFKit
import AppKit

let args = CommandLine.arguments
guard args.count == 5,
      let pageNum = Int(args[2]),
      let width = Int(args[4]),
      let doc = PDFDocument(url: URL(fileURLWithPath: args[1])),
      let page = doc.page(at: pageNum - 1)
else {
    FileHandle.standardError.write("usage: swift pdf-page.swift <in.pdf> <page> <out.png> <width>\n".data(using: .utf8)!)
    exit(1)
}

let box = page.bounds(for: .mediaBox)
let scale = CGFloat(width) / box.width
let size = CGSize(width: box.width * scale, height: box.height * scale)

let image = NSImage(size: size, flipped: false) { rect in
    guard let ctx = NSGraphicsContext.current?.cgContext else { return false }
    NSColor.white.setFill()
    rect.fill()
    ctx.saveGState()
    ctx.scaleBy(x: scale, y: scale)
    ctx.translateBy(x: -box.origin.x, y: -box.origin.y)
    page.draw(with: .mediaBox, to: ctx)
    ctx.restoreGState()
    return true
}

guard let tiff = image.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff),
      let png = rep.representation(using: .png, properties: [:])
else { exit(2) }

try! png.write(to: URL(fileURLWithPath: args[3]))
