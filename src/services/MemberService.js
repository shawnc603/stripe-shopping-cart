class MemberService {
  constructor(Member) {
    this.Member = Member;
    this.saveMember = this.saveMember.bind(this);
    this.getMember = this.getMember.bind(this);
  }

  async saveMember(member) {
    await member.save();
    return member;
  }

  async getMember(email) {
    return await this.Member.find({email: email});
  }

  async getMemberByEmail(email) {
    return await this.Member.find({email: email});
  }

}

module.exports = MemberService;