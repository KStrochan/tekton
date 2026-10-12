export const photos = {
  wardrobe: "1722942722309-3f1ad24f841e",
  hallway: "1720087448033-db1904db294b",
  kitchen: "1782290546855-03a5def1d265",
  workshop: "1687422810663-c316494f725a",
  shelving: "1560449752-3fd4bdbe7df0",
};

export const pieces = [
  { code: "T-01", name: "Bedroom wardrobe", size: "240 × 260 × 60 cm", material: "Painted MDF, oak interior", from: 2900 },
  { code: "T-02", name: "Galley kitchen", size: "360 cm run", material: "Birch ply, linoleum fronts", from: 8400 },
  { code: "T-03", name: "Alcove shelving", size: "110 × 240 × 32 cm", material: "Solid oak", from: 1350 },
  { code: "T-04", name: "Hallway cabinet", size: "180 × 220 × 40 cm", material: "Painted MDF, push-to-open", from: 1900 },
  { code: "T-05", name: "Media wall", size: "320 × 90 × 45 cm", material: "Walnut veneer", from: 3600 },
  { code: "T-06", name: "Under-stair storage", size: "Fitted to the stair", material: "Birch ply", from: 2200 },
];

export const featured = [
  {
    title: "Wardrobe wall, bedroom",
    note: "Floor to ceiling, with the doors cut around a sloped ceiling.",
    photo: photos.wardrobe,
    alt: "Bedroom with a fitted white wardrobe along one wall",
  },
  {
    title: "Kitchen, apartment",
    note: "A 3.6 m run with integrated appliances and a quartz top.",
    photo: photos.kitchen,
    alt: "Modern kitchen with grey cabinets and a white counter",
  },
  {
    title: "Shelving, living room",
    note: "Oak shelves on both sides of the window, sized for records.",
    photo: photos.shelving,
    alt: "Living room with wooden shelving, a sofa and a coffee table",
  },
];

export const steps = [
  { title: "Measure", text: "We visit, laser-measure the room and note every skirting board, socket and slope." },
  { title: "Drawing", text: "You get a scaled drawing and a fixed price within five working days. Changes are free until you sign." },
  { title: "Workshop", text: "Each piece is cut, assembled and finished in our workshop. Typical lead time is four to six weeks." },
  { title: "Fitting", text: "Two fitters install it in one or two days, scribe it to the walls and take the packaging away." },
];

export const materials = [
  { name: "Birch ply", note: "Pale, hard-wearing, visible layered edge", swatch: "#E3CFAE" },
  { name: "Oak", note: "Warm grain, oiled or lacquered", swatch: "#C49A6C" },
  { name: "Walnut", note: "Dark, rich, veneer on stable core", swatch: "#6B4A35" },
  { name: "Painted", note: "Any colour, smooth spray finish", swatch: "#D8D5CF" },
];
