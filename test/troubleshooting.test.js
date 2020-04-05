const Conversation = require("../conversation");
const conv = new Conversation("./dialogues/troubleshooting.json");

describe.skip("case 1", () => {
  it("phoneModel->samsungServiceEnd", async () => {
    // seed
    await conv.reply("");
    await conv.reply("phoneModel");
    //test
    const result = await conv.reply("samsungServiceEnd");
    expect(result).toBe("Contact Samsung service?");
  });
});

describe.skip("case 2", () => {
  it("routerReset->anotherCable->contactSupportEnd", async () => {
    // seed
    await conv.reply("");
    await conv.reply("routerReset");
    await conv.reply("anotherCable");
    //test
    const result = await conv.reply("contactSupportEnd");
    expect(result).toBe("Contact our customer support for more help.");
  });
});

describe("case 3", () => {
  it("routerReset->anotherCable->tryAnotherCableEnd->", async () => {
    // seed
    await conv.reply("");
    await conv.reply("routerReset");
    await conv.reply("anotherCable");
    //test
    const result = await conv.reply("tryAnotherCableEnd");
    expect(result).toBe(
      "Try with another cable and contact our customer support if the problem still persists."
    );
  });
});
