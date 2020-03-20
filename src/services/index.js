const MemberService = require("./MemberService");
const EducationService = require("./EducationService");
const ConfirmService = require("./ConfirmService");
const { Member, Education } = require("../models");


const memberService = new MemberService(Member);
const educationService = new EducationService(Education);
const confirmService = new ConfirmService();

module.exports = {
  memberService,
  educationService,
  confirmService
};