function Section(grade, strand) {
	const section_getter = {
		11: {
			STEM: ["Pythagoras", "Euclid", "Archimedes"],
			ICT: ["Torvalds", "Jobs", "Gates", "Dell"],
			HUMMS: ["Socrates", "Plato", "Aristotle"],
			HE: ["Laurentiis", "Laudico"],
			GAS: ["Rizal", "Bonfacio", "Plaridel", "Aguinaldo"],
			ABM: ["Hamilton", "Pacioli", "Porter", "Smith"],
		},
		12: {
			STEM: ["Newton", "Kepler", "Einstein"],
			ICT: ["Pascal", "Hollerith", "Babbage"],
			HUMMS: ["Confucious", "Siddhartha"],
			HE: ["Escoffier"],
			GAS: ["Mabini", "Balagtas"],
			ABM: ["Morgan", "Ford"],
		},
		get section_get() {
			if (grade === "" || strand === "") {
				return "";
			} // this is important
			return this[grade][strand];
		},
	};
	return section_getter;
}

export default Section;
