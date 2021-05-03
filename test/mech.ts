import * as assert from "assert";
import { AesCbcParams, Mechanism, MechanismEnum } from "../src";

context("Mechanism", () => {

  context("create", () => {

    it("from mechanism handler", () => {
      const p11Mechanism = Mechanism.create(0x80000c01);

      assert.strictEqual(p11Mechanism.mechanism, 0x80000c01);
      assert.strictEqual(p11Mechanism.parameter, null);
    });

    it("from name", () => {
      const p11Mechanism = Mechanism.create(MechanismEnum[MechanismEnum.AES_CTR]);

      assert.strictEqual(p11Mechanism.mechanism, MechanismEnum.AES_CTR);
      assert.strictEqual(p11Mechanism.parameter, null);
    });

    it("from algorithm", () => {
      const params = Buffer.alloc(16);
      const p11Mechanism = Mechanism.create({
        name: MechanismEnum.AES_CBC,
        params,
      });

      assert.strictEqual(p11Mechanism.mechanism, MechanismEnum.AES_CBC);
      assert.strictEqual(p11Mechanism.parameter, params);
    });

  });

});
