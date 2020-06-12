import React from "react";
import CCard from '../components/CCard'
import { Row, Col } from "shards-react";
import './stylesheets/communities.css'

//airtable
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'keyDVcVmNzsT5snDZ' }).base('appDOqSkGGREqLwe4');




class Communities extends React.Component {

  constructor(props) {
    super(props)
    this.ids = props.data
    this.records = []
    this.state = {
      doneFetch: false
    }
    console.log(this.ids)
    console.log(getQuery(this.ids))
  }

  componentDidMount() {
    base('Communities').select({
      filterByFormula: getQuery(this.ids),
      view: "Global View"
    }).eachPage((records, fetchNextPage) => {

      records.forEach((record) => {
        let temp = {
          name: record.get('Name'),
          platform: record.get('Platform'),
          link: record.get('Link'),
          member: record.get('Members')
        }
        this.records.push(temp)
        console.log(temp)
      });

      fetchNextPage();

    }, (err) => {
      if (err) { console.error(err); return; }
      console.log( "RECORDS ",this.records)
      this.setState({
        doneFetch: true
      });
    });

  }




  render(props) {

    return (
      this.state.doneFetch ? this.getContent() : <center><div>Loading...</div></center>
    );
  }

  getContent = () => {
    let content = (
      <div>

          <div className="results">
            <Row className="row">
            {
              this.records.map(record => (
                <Col sm="12" md="6" lg="4">
                  <CCard  link={record.link} name={record.name} platform={record.platform} member={record.member}></CCard>
                </Col>
              ))
            }
            </Row>
          </div>
        </div>
    )

    return content
  }
}

// Function to crete query string
// e.g "(OR(RECORD_ID() = 'rec71zhEpPj4pmSAv', RECORD_ID() = 'rec1wc0lwjcv1bEUj'))"
const getQuery = (ids) => {

  if (ids.length > 0) {
    let start = "(OR("
    let end = "))"

    let temp = "RECORD_ID() = '" + ids[0] + "'"

    for (let i = 1; i < ids.length; i++) {
      temp = temp + ", RECORD_ID() = '" + ids[i] + "'"
    }

    return start + temp + end
  }

  // default case
  return "(OR(0))"
}

export default Communities