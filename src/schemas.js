const { schema } = require("normalizr");
// const assert = require("assert"); // Ensure non-circular dependencies and undefined objects.

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

// assert(exports.brand);
// assert(exports.delegationship);
// assert(exports.initiative);
exports.benefit = new schema.Entity(
  "benefits",
  {
    responsable: {
      brand: exports.brand,
      delegationship: exports.delegationship,
      initiative: exports.initiative,
    },
  },
  {
    idAttribute: "_id",
  }
);

// assert(exports.brand);
// assert(exports.delegationship);
// assert(exports.initiative);
exports.survey = new schema.Entity(
  "surveys",
  {
    responsable: {
      brand: exports.brand,
      delegationship: exports.delegationship,
      initiative: exports.initiative,
    },
  },
  {
    idAttribute: "_id",
  }
);

// assert(exports.benefit);
exports.activation = new schema.Entity(
  "activations",
  {
    benefit: exports.benefit,
  },
  {
    idAttribute: "_id",
  }
);

// assert(exports.survey);
exports.vote = new schema.Entity(
  "votes",
  {
    survey: exports.survey,
  },
  {
    idAttribute: "_id",
  }
);

// assert(exports.campus);
// assert(exports.tag);
// assert(exports.initiative);
// assert(exports.delegationship);
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

// assert(exports.event);
// assert(exports.benefit);
// assert(exports.initiative);
// assert(exports.delegationship);
// assert(exports.survey);
exports.notification = new schema.Entity(
  "notifications",
  {
    action: {
      event: exports.event,
      benefit: exports.benefit,
      initiative: exports.initiative,
      delegationship: exports.delegationship,
      survey: exports.survey,
    },
  },
  {
    idAttribute: "_id",
  }
);
