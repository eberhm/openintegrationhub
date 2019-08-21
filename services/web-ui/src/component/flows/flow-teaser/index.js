import React from 'react';
import flow from 'lodash/flow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Ui
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from '@material-ui/core/Modal';
import {
    Delete, Edit, PlayArrow, Stop,
} from '@material-ui/icons';


// Componente
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
// Diagram
import Graph from '../flow-graph';

// Actions
import {
    deleteFlow, updateFlow, startFlow, stopFlow,
} from '../../../action/flows';

const useStyles = {
    heading: {
        fontSize: '0.9375rem',
        fontWeight: '400',
    },
    modal: {
        backgroundColor: 'white',
        margin: 'auto',
        outline: 'none',
    },
    indicator: {
        height: '10px',
        width: '10px',
        borderRadius: '50%',
        display: 'inline-block',
    },
};

class FlowTeaser extends React.PureComponent {
    state= {
        editFlow: false,
        editorData: null,
    }

    // getNodes() {
    //     return this.props.data.graph.nodes && this.props.data.graph.nodes.map(node => <Grid container key={`node-${node.id}`}>
    //         <Grid item xs={3}><InputLabel>Id:</InputLabel><Typography>{node.id}</Typography></Grid>
    //         <Grid item xs={3}><InputLabel>Name:</InputLabel><Typography>{node.name && node.name}</Typography></Grid>
    //         <Grid item xs={3}><InputLabel>Description:</InputLabel><Typography>{node.description && node.description}</Typography></Grid>
    //         <Grid item xs={3}><InputLabel>Function:</InputLabel><Typography>{node.function}</Typography></Grid>
    //     </Grid>);
    // }

    // getEdges() {
    //     return this.props.data.graph.edges && this.props.data.graph.edges.map((node, index) => <Grid container key={`edges-${index}`}>
    //         <Grid item xs={3}><InputLabel>Source:</InputLabel><Typography>{node.source}</Typography></Grid>
    //         <Grid item xs={3}><InputLabel>Target:</InputLabel><Typography>{node.target}</Typography></Grid>
    //         <Grid item xs={3}><InputLabel>Condition:</InputLabel><Typography>{node.config && node.config.condition ? node.config.condition : ''}</Typography></Grid>
    //     </Grid>);
    // }

    editOpen= (e) => {
        e.stopPropagation();
        this.setState({
            editFlow: true,
        });
    }

    deleteFlow = (e) => {
        e.stopPropagation();
        this.props.deleteFlow(this.props.data.id);
    }

    startFlow = (e) => {
        e.stopPropagation();
        this.props.startFlow(this.props.data.id);
    }

    stopFlow = (e) => {
        e.stopPropagation();
        this.props.stopFlow(this.props.data.id);
    }

    updateFlow = () => {
        this.props.updateFlow(this.state.editorData);
        this.setState({
            editFlow: false,
        });
    }

    editorChange(e) {
        if (!e.error) {
            this.setState({
                editorData: e.jsObject,
            });
        }
    }

    getStatus(classes) {
        switch (this.props.data.status) {
        case 'starting':
            return <span className={classes.indicator} style={{ backgroundColor: 'yellow' }}/>;
        case 'stopping':
            return <span className={classes.indicator} style={{ backgroundColor: 'red' }}/>;
        case 'active':
            return <span className={classes.indicator} style={{ backgroundColor: 'green' }}/>;
        case 'inactive':
            return <span className={classes.indicator} style={{ backgroundColor: 'grey' }}/>;
        default:
            return null;
        }
    }

    render() {
        const {
            classes,
        } = this.props;
        return (
            <Grid item xs={12}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >

                        <Grid container>
                            <Grid item xs={3}><InputLabel>Name:</InputLabel><Typography >{this.props.data.name}</Typography></Grid>
                            <Grid item xs={3}><InputLabel>Description:</InputLabel><Typography >{this.props.data.description}</Typography></Grid>
                            {this.props.data.status
                                && <Grid item xs={3}><InputLabel>Status:</InputLabel><Typography >{this.getStatus(classes)} {this.props.data.status}</Typography></Grid>}
                            <Grid item xs={3}>
                                <Button aria-label="next" onClick={this.editOpen}>
                                    <Edit/>
                                </Button>
                                <Button aria-label="next" onClick={this.deleteFlow}>
                                    <Delete/>
                                </Button>
                                <Button aria-label="next" onClick={this.startFlow}>
                                    <PlayArrow/>
                                </Button>
                                <Button aria-label="next" onClick={this.stopFlow}>
                                    <Stop/>
                                </Button>
                            </Grid>
                        </Grid>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            {/* <Grid item xs={12}><h3>Nodes</h3>
                                {
                                    this.props.data.graph && this.getNodes()
                                }
                            </Grid>
                            <Grid item xs={12}><h3>Edges</h3>
                                {
                                    this.props.data.graph && this.getEdges()
                                }
                            </Grid> */}

                            <Grid item xs={12}>
                                <Graph
                                    width={1080}
                                    height={300}
                                    name={this.props.data.name}
                                    data={{
                                        nodes: this.props.data.graph.nodes,
                                        links: this.props.data.graph.edges,
                                    }}


                                />
                            </Grid>
                            <Grid item xs={12}><h3>Meta</h3></Grid>
                            <Grid item xs={3}><InputLabel>Type:</InputLabel><Typography >{this.props.data.type}</Typography></Grid>
                            <Grid item xs={3}><InputLabel>Created:</InputLabel><Typography>{moment(this.props.data.createdAt).format('HH:mm:ss DD.MM.YYYY')}</Typography></Grid>
                            <Grid item xs={3}><InputLabel>Updated:</InputLabel><Typography >{moment(this.props.data.updatedAt).format('HH:mm:ss DD.MM.YYYY')}</Typography></Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.editFlow}
                    onClose={ () => { this.setState({ editFlow: false }); }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div className={classes.modal}>
                        <JSONInput
                            id = 'jsonEdit'
                            locale = {locale}
                            theme = 'dark_vscode_tribute'
                            placeholder = {this.props.data}
                            height = '550px'
                            width = '600px'
                            onChange={this.editorChange.bind(this)}
                        />
                        <Button variant="outlined" aria-label="Add" onClick={() => { this.setState({ editFlow: false }); }}>
                            close
                        </Button>
                        <Button variant="outlined" aria-label="Add" onClick={this.updateFlow}>
                            Save
                        </Button>
                    </div>

                </Modal>
            </Grid>
        );
    }
}

const mapStateToProps = state => ({
    flows: state.flows,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    deleteFlow,
    updateFlow,
    startFlow,
    stopFlow,
}, dispatch);

export default flow(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withStyles(useStyles),
)(FlowTeaser);
