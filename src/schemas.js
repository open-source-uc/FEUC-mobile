const { schema } = require("normalizr");

exports.notification = new schema.Entity("notifications");

exports.brand = new schema.Entity(
  "brands",
  {},
  {
    idAttribute: "_id",
  }
);

exports.tag = new schema.Entity(
  "tags",
  {},
  {
    idAttribute: "_id",
  }
);

exports.place = new schema.Entity(
  "places",
  {},
  {
    idAttribute: "_id",
  }
);

exports.campus = new schema.Entity(
  "campuses",
  {},
  {
    idAttribute: "_id",
  }
);

exports.attendance = new schema.Entity(
  "attendances",
  {},
  {
    idAttribute: "_id",
  }
);

exports.initiative = new schema.Entity(
  "initiatives",
  {},
  {
    idAttribute: "_id",
  }
);

exports.delegationship = new schema.Entity(
  "delegationships",
  {},
  {
    idAttribute: "_id",
  }
);

exports.device = new schema.Entity(
  "devices",
  {},
  {
    idAttribute: "_id",
  }
);

exports.benefit = new schema.Entity(
  "benefits",
  {
    responsable: {
      brand: exports.brand,
    },
  },
  {
    idAttribute: "_id",
  }
);

exports.activation = new schema.Entity(
  "activations",
  {
    benefit: exports.benefit,
    // device: exports.device,
  },
  {
    idAttribute: "_id",
  }
);

exports.event = new schema.Entity(
  "events",
  {
    campus: exports.campus,
    tags: [exports.tag],
    organizer: {
      initiative: exports.initiative,
      delegationship: exports.delegationship,
    },
  },
  {
    idAttribute: "_id",
  }
);
