class EducationService {
    constructor(Education) {
      this.Education = Education;
      this.saveEducation= this.saveEducation.bind(this);
      this.getEducation = this.getEducation.bind(this);
    }
  
    async saveEducation(education) {
      await education.save();
      return education;
    }
  
    async getEducation(email) {
      return await this.Education.find({email: email});
    }

    async getEducationByEmail(email) {
      return await this.Education.find({parentEmail: email});
    }
  
  }
  
  module.exports = EducationService;