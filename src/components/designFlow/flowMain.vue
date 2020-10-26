<template>
  <div class="appcontainer" v-loading="loading">
    <div class="flow-menu">
      <div>
        <div class="menu-item" v-for="(item, index) in menueList" :key="index" :class="{'isDraggable': !isEdit}"
             :draggable="isEdit" @dragstart="drag(item)"
        >
          <img class="imgsrc" :src="item.img" v-show="isEdit">
          <img class="imgsrc" :src="item.noDropImg" v-show="!isEdit">
          <div>{{item.name}}</div>
        </div>
        <div class="menu-item" @click="isConnect=true" :class="{'isDraggable': !isEdit}">
          <i class="el-icon-bottom-right"></i>
          <div>连线</div>
        </div>
        <div class="menu-item" @click="isConnect=false" :class="{'isDraggable': !isEdit}">
          <i class="el-icon-rank"></i>
          <div>选择</div>
        </div>
      </div>
      <hr style="margin-bottom: 20px"/>
      <div class="menu-item item2" v-for="(item, index) in navList" :key="'val' + index"
           :class="{'isDraggable': !isEdit }">
        <div v-if="item.isShow">
          <img class="imgsrc" :src="item.img" v-show="isEdit" @click="goPage(item.name)">
          <img class="imgsrc" :src="item.noDropImg" v-show="!isEdit">
          <div>{{item.name}}</div>
        </div>
        <div v-else class="isShow">
          <img class="imgsrc" :src="item.noDropImg">
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="page_right">
      <div style="height: 100%">
        <div class="add_design">
          <div class="nav-item title_name">{{ name }}</div>
          <div class="middle">
            <div class="nav-item" @click="addDesign()" v-show="!isEdit"><!-- 可新建设计 -->
              <img src="@/assets/img/add.png">
              <span>新建设计</span>
            </div>
            <div class="nav-item nosave" v-show="isEdit"><!-- 不可新建设计 -->
              <img src="@/assets/img/add2.png">
              <span>新建设计</span>
            </div>
            <!--<div class="nav-item" v-show="!isAdd">&lt;!&ndash; 可打开 &ndash;&gt;-->
              <!--<img src="@/assets/img/open.png">-->
              <!--<span>打开</span>-->
            <!--</div>-->
            <!--<div class="nav-item nosave" v-show="isAdd">&lt;!&ndash; 不可打开 &ndash;&gt;-->
              <!--<img src="@/assets/img/open2.png">-->
              <!--<span>打开</span>-->
            <!--</div>-->
            <div class="nav-item" v-show="isEdit" @click="saveData()"> <!-- 可保存 -->
              <img src="@/assets/img/save.png">
              <span>保存</span>
            </div>
            <div class="nav-item nosave" v-show="!isEdit"><!-- 不可保存 -->
              <img src="@/assets/img/save2.png">
              <span>保存</span>
            </div>
            <div class="nav-item close"  @click="closeProject()">
              <img src="@/assets/img/close.png">
              <span>关闭</span>
            </div>
            <div class="nav-item" @click="computer()">
              <img src="@/assets/img/computer.png">
              <span>物性速算</span>
            </div>
            <div class="clearBoth"></div>
          </div>
        </div>
        <div class="flow-detail" @click="togglePanel">
          <div
            id="flowContent"
            ref="flowContent"
            @drop="drop($event)"
            @dragover="allowDrop($event)"
            @click="editFlow()"
            @dblclick="isConnect=false"
          >
            <flowNode
              v-for="node in data.nodeList"
              :key="node.id"
              :node="node"
              :id="node.id"
              :isconnect="isConnect"
              @delete-node="deleteNode"
              @change-node-site="changeNodeSite"
              @edit-node="editNode"
            ></flowNode>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建弹框 -->
    <div class="zll-dialog">
      <popout title="创建新项目" :visible.sync="addDialog" v-if="addDialog" class="adddesign_dialog">
        <Add ref="add" slot="content" @addForm="getFormData"></Add>
        <template slot="bottom">
          <p class="zll-botton cancal" @click="addDialog = false">取 消</p>
          <p class="zll-botton" @click="()=>{this.$refs.add.setFormData('addForm')}">提 交</p>
        </template>
      </popout>
    </div>
    <!-- 物性速算弹框 -->
    <div class="zll-dialog">
      <popout title="物性速算" :visible.sync="computerDialog" v-if="computerDialog" class="computer_dialog">
        <Computer ref="add" slot="content"></Computer>
      </popout>
    </div>
    <!-- 参数 -->
    <div class="drawer_bottom" v-show="drawer" ref="drawer">
      <div class="flow-edit">
        <div class="flow-edit-content">
          <edit-flow ref="nodeFfloworm" v-show="editType=='flow'"></edit-flow>
          <edit-node ref="nodeForm" v-show="editType=='node'" :isShowEchart="isShowEchart" @LoadSet="getLoad"
                     @showLog="showLog"></edit-node>
          <edit-line ref="lineForm" v-show="editType=='line'" @line-save="lineLabelSave"
                     @lineCompute="lineCompute" @checkResult="checkLog"></edit-line>
        </div>
      </div>
    </div>
    <!-- 24h负载设置 -->
    <div class="zll-dialog">
      <popout title="24h负载设置" :visible.sync="setDialog" v-show="setDialog" class="setDialog_dialog">
        <LoadSet ref="set" slot="content" :loadSetData="loadSetData" @setForm="getLoadData"></LoadSet>
        <template slot="bottom">
          <p class="zll-botton" @click="()=>{this.$refs.set.setFormData('setForm')}">提 交</p>
        </template>
      </popout>
    </div>
    <!-- 用户输出结果 -->
    <div class="zll-dialog">
      <popout title="用户输出结果" :visible.sync="logDialog" v-show="logDialog" class="resultDialog_dialog">
        <LogResult ref="result" slot="content"></LogResult>
        <template slot="bottom">
          <p class="zll-botton" @click="logDialog = false">确 定</p>
        </template>
      </popout>
    </div>
    <!-- 查看输出结果 -->
    <div class="zll-dialog">
      <popout title="查看输出结果" :visible.sync="checkDialog" v-show="checkDialog" class="resultDialog_dialog">
        <CheckResult ref="result" slot="content"></CheckResult>
        <template slot="bottom">
          <p class="zll-botton" @click="checkDialog = false">确 定</p>
        </template>
      </popout>
    </div>
    <!-- 项目信息弹框 -->
    <div class="zll-dialog">
      <popout title="项目信息" :visible.sync="projectDialog" v-if="projectDialog" class="adddesign_dialog">
        <ProjectInfo ref="result" slot="content" :editData="programInfo"></ProjectInfo>
        <template slot="bottom">
          <p class="zll-botton cancal" @click="projectDialog = false">取 消</p>
        </template>
      </popout>
    </div>
  </div>
</template>

<script>
  import {jsPlumb} from "jsplumb";
  import flowNode from "./flowNode.vue";
  import editFlow from "./editFlow.vue";
  import editNode from "./editNode.vue";
  import editLine from "./editLine.vue";
  import Add from "@/views/DesignPage/add.vue";
  import Computer from "@/views/DesignPage/computer.vue";
  import LoadSet from "@/views/DesignPage/loadSet.vue";
  import CheckResult from "@/views/DesignPage/CheckResult.vue";
  import LogResult from "@/views/DesignPage/LogResult.vue";
  import ProjectInfo from "@/views/DesignPage/ProjectInfo/index.vue";
  import {getToken} from '@/utils/auth' // 验权

  let isAdd = sessionStorage.getItem('isAdd')
  export default {
    name: "flowMain",
    data() {
      return {
        //图形是否编辑
        isEdit:false,
        programInfo: {},
        name: '',
        type: '',
        loading: false,
        addDialog: false,//新建设计弹框
        computerDialog: false,//物性速算弹框
        isAdd: false,//是否新建设计
        isDraggable: true,//
        drawer: false,//参数设定

        loadSetData:{},
        setDialog: false,//24h负载设置弹框

        isShowEchart: false,//24h负载echart
        logDialog: false,//用户输出结果弹框
        checkDialog:false,//查看输出结果弹框
        projectDialog: false,//项目信息弹框
        menueList: [
          {
            type: 1,
            name: "热源",
            alia: "S",
            img: require("@/assets/img/reyuan.png"),
            noDropImg: require("@/assets/img/reyuan2.png"),
          }, {
            type: 2,
            name: "节点",
            alia: "N",
            img: require("@/assets/img/jiedian.png"),
            noDropImg: require("@/assets/img/jiedian2.png"),
          }, {
            type: 3,
            name: "用户",
            alia: "C",
            img: require("@/assets/img/yonghu.png"),
            noDropImg: require("@/assets/img/yonghu2.png"),
          },
        ],
        navList: [
          {
            name: "项目信息",
            img: require("@/assets/img/xmxinxi.png"),
            noDropImg: require("@/assets/img/xmxinxi2.png"),
            isShow: true,
          }, {
            name: "设计检查",
            img: require("@/assets/img/jiancha.png"),
            noDropImg: require("@/assets/img/jiancha2.png"),
            isShow: true,
          }, {
            name: "管网计算",
            img: require("@/assets/img/jisuan.png"),
            noDropImg: require("@/assets/img/jisuan2.png"),
            isShow: false,
          }, {
            name: "统计分析",
            img: require("@/assets/img/tongji.png"),
            noDropImg: require("@/assets/img/tongji2.png"),
            isShow: false,
          },
        ],
        jsPlumb: null, // jsPlumb 实例
        index: 1,
        // 默认设置参数
        jsplumbSetting: {
          // 动态锚点、位置自适应
          Anchors: [
            "Top",
            "TopCenter",
            "TopRight",
            "TopLeft",
            "Right",
            "RightMiddle",
            "Bottom",
            "BottomCenter",
            "BottomRight",
            "BottomLeft",
            "Left",
            "LeftMiddle",
          ],
          Container: "flowContent",
          // 连线的样式 StateMachine、Flowchart,有四种默认类型：Bezier（贝塞尔曲线），Straight（直线），Flowchart（流程图），State machine（状态机）
          Connector: "Straight",
          //这个是鼠标拉出来的线的属性
          ConnectionOverlays: [
            [
              "Label",
              {
                label: "连线文本",
                id: "label-1",
                cssClass: "csslabel",
              },
            ],
          ],
          // 鼠标不能拖动删除线
          ConnectionsDetachable: false,
          // 删除线的时候节点不删除
          DeleteEndpointsOnDetach: false,
          // 连线的端点
          // Endpoint: ["Dot", {radius: 5}],
          Endpoint: [
            "Rectangle",
            {
              height: 10,
              width: 10,
            },
          ],
          // 线端点的样式
          EndpointStyle: {
            fill: "rgba(255,255,255,0)",
            outlineWidth: 1,
          },
          LogEnabled: true, //是否打开jsPlumb的内部日志记录
          // 绘制线
          PaintStyle: {
            stroke: "#1397de",
            strokeWidth: 3,
          },
          // 绘制箭头
          Overlays: [
            [
              "Arrow",
              {
                width: 8,
                length: 8,
                location: 1,
              },
            ],
          ],
          RenderMode: "svg",
        },
        // jsplumb连接参数
        jsplumbConnectOptions: {
          isSource: true,
          isTarget: true,
          // 动态锚点、提供了4个方向 Continuous、AutoDefault
          anchor: "Continuous",
        },
        jsplumbSourceOptions: {
          filter: ".flow-node-drag", //触发连线的区域
          /*"span"表示标签，".className"表示类，"#id"表示元素id*/
          filterExclude: false,
          anchor: "Continuous",
          allowLoopback: false,
        },
        jsplumbTargetOptions: {
          filter: ".flow-node-drag",
          /*"span"表示标签，".className"表示类，"#id"表示元素id*/
          filterExclude: false,
          anchor: "Continuous",
          allowLoopback: false,
        },
        // 是否加载完毕
        loadEasyFlowFinish: false,
        // 数据
        data: {
          flowInfo: {
            Id: this.getUUID(),
            Name: "我的流程",
            Remark: "",
          },
          nodeList: [],
          lineList: [],
        },
        currentItem: "", //临时存添加的元素
        isConnect: false, //判断是否连接
        timer: null, //定时器,判断单双击,
        currentConnect: "", //当前的连接线
        currentLine: "", //当前连接线数据
        editType: "", //编辑的类型
      };
    },
    components: {
      flowNode,
      editFlow,
      editNode,
      editLine,
      Add,
      Computer,
      LoadSet,
      LogResult,
      ProjectInfo,
      CheckResult
    },
    created() {
    },
    mounted() {
      this.jsPlumb = jsPlumb.getInstance();
      this.$nextTick(() => {
        this.init();
      });
      this.editFlow();

      isAdd = sessionStorage.getItem('isAdd')
      this.loading = true
      if (!isAdd) {
        this.isAdd = false
        this.isDraggable = true
      } else {
        this.isAdd = true
        this.isDraggable = true
      }
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    methods: {
      init() {
        document.oncontextmenu = function () {
          return false;
        }
        const _this = this;
        this.jsPlumb.ready(function () {
          // 导入默认配置
          _this.jsPlumb.importDefaults(_this.jsplumbSetting);
          // 会使整个jsPlumb立即重绘。
          _this.jsPlumb.setSuspendDrawing(false, true);
          // 初始化节点
          _this.loadEasyFlow();

          // 单点连接线（编辑label）,
          _this.jsPlumb.bind("click", function (conn, originalEvent) {

            _this.editLine(conn);

          });
          // 双击连接线（删除）,
          _this.jsPlumb.bind("contextmenu", function (conn, originalEvent) {
            clearTimeout(this.timer);
            // console.log("dblclick", conn);

            _this.$confirm("确定删除所点击的线吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                _this.jsPlumb.deleteConnection(conn);
                _this.drawer = false
              })
              .catch(() => {
              });
          });
          // 连线
          _this.jsPlumb.bind("connection", function (evt) {
            console.log("connection", evt);
            let from = evt.source.id;
            let to = evt.target.id;
            if (_this.loadEasyFlowFinish) {
              _this.data.lineList.push({
                from: from,
                to: to,
                label: from + to,
                id: _this.getUUID(),
                Remark: "",
                psType: "",
                pipeOutside: "",
                pipeWidth: "",
                pipeSize: "",
                pipeG:{},
                localNum: "",
                airOutside: "",
                pressNum: "",
                degreeNum: "",
                degreeLevel: "",
                pipeName: from + to,
              });
            }
            evt.connection.getOverlay("label-1").setLabel(from + to);
            setTimeout(function () {
              _this.editLine(evt.connection);
            }, 100);
          });

          // 删除连线
          _this.jsPlumb.bind("connectionDetached", function (evt) {
            // console.log("connectionDetached", evt);
            _this.deleteLine(evt.sourceId, evt.targetId);
          });

          // 改变线的连接节点
          _this.jsPlumb.bind("connectionMoved", function (evt) {
            // console.log("connectionMoved", evt);
            _this.changeLine(
              evt.originalSourceId,
              evt.originalTargetId
            );
          });

          // 单击endpoint
          // jsPlumb.bind("endpointClick", function (evt) {
          //   console.log('endpointClick', evt)
          // })
          //
          // // 双击endpoint
          // jsPlumb.bind("endpointDblClick", function (evt) {
          //   console.log('endpointDblClick', evt)
          // })

          // contextmenu 右键
          _this.jsPlumb.bind("contextmenu", function (evt) {
            // console.log("contextmenu", evt);
          });

          // beforeDrop
          _this.jsPlumb.bind("beforeDrop", function (evt) {
            // console.log("beforeDrop", evt);
            let from = evt.sourceId;
            let to = evt.targetId;
            if (from === to) {
              _this.$message.error("不能连接自己");
              return false;
            }
            if (_this.hasLine(from, to)) {
              _this.$message.error("不能重复连线");
              return false;
            }
            if (_this.hashOppositeLine(from, to)) {
              _this.$message.error("不能回环哦");
              return false;
            }
            if (_this.origUser(from, to)) {
              _this.$message.error("用户节点不能作为起始节点！");
              return false;
            }
            return true;
          });

          // beforeDetach
          _this.jsPlumb.bind("beforeDetach", function (evt) {
            // console.log("beforeDetach", evt);
          });
        });
      },
      // 加载流程图
      loadEasyFlow() {
        // 初始化节点
        for (var i = 0; i < this.data.nodeList.length; i++) {
          let node = this.data.nodeList[i];
          // 设置源点，可以拖出线连接其他节点
          this.jsPlumb.makeSource(node.id, this.jsplumbSourceOptions);
          // // 设置目标点，其他源点拖出的线可以连接该节点
          this.jsPlumb.makeTarget(node.id, this.jsplumbTargetOptions);
          // jsPlumb.addEndpoint(node.id)
          // 设置可拖拽
          // jsPlumb.draggable(node.id, {
          //     containment: 'parent',
          //     grid: [10, 10]
          // })

          this.jsPlumb.draggable(node.id, {
            containment: "parent",
          });

          // jsPlumb.draggable(node.id)
        }
        // 初始化连线
        for (var i = 0; i < this.data.lineList.length; i++) {
          let line = this.data.lineList[i];
          let connection = this.jsPlumb.connect(
            {
              source: line.from,
              target: line.to,
            },
            this.jsplumbConnectOptions
          );
          connection.getOverlay("label-1").setLabel(line.label); //初始化label
        }
        this.$nextTick(function () {
          this.loadEasyFlowFinish = true;
        });
      },
      // 添加新的节点
      addNode(temp) {
        // console.log("添加节点", temp);
        this.data.nodeList.push(temp);
        this.$nextTick(function () {
          this.jsPlumb.makeSource(temp.id, this.jsplumbSourceOptions);
          this.jsPlumb.makeTarget(temp.id, this.jsplumbTargetOptions);
          this.jsPlumb.draggable(temp.id, {
            containment: "parent",
          });
        });
      },
      // 删除线
      deleteLine(from, to) {
        this.data.lineList = this.data.lineList.filter(function (line) {
          return line.from !== from && line.to !== to;
        });
      },
      // 改变连线
      changeLine(oldFrom, oldTo) {
        this.deleteLine(oldFrom, oldTo);
      },
      // 改变节点的位置
      changeNodeSite(data) {
        for (var i = 0; i < this.data.nodeList.length; i++) {
          let node = this.data.nodeList[i];
          if (node.id === data.nodeId) {
            node.left = data.left;
            node.top = data.top;
          }
        }
      },
      //删除节点
      deleteNode(nodeId) {
        this.$confirm("确定要删除节点" + nodeId + "?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          closeOnClickModal: false,
        }).then(() => {
          // this.data.nodeList = this.data.nodeList.filter(function(node) {
          // 	if (node.id === nodeId) {
          // 		node.show = false
          // 	}
          // 	return true
          // })
          this.data.nodeList.forEach((item, index) => {
            if (item.id === nodeId) {
              this.data.nodeList.splice(index, 1);
            }
          });

          this.$nextTick(function () {
            console.log("删除" + nodeId);
            this.drawer = false
            this.jsPlumb.removeAllEndpoints(nodeId);
          });
        })
          .catch(() => {
          });
        return true;
      },
      //编辑节点
      editNode(nodeId) {
        //console.log('编辑节点', nodeId)
        this.drawer = true;
        this.editType = "node";
        this.$nextTick(function () {
          this.$refs.nodeForm.init(this.data, nodeId);
        });
      },
      editLine(conn) {
        var _this = this;
        _this.currentConnect = conn;
        _this.data.lineList.forEach(function (item, index) {
          if (item.from == conn.sourceId && item.to == conn.targetId) {
            _this.currentLine = item;
            _this.editType = "line";
            _this.$nextTick(function () {
              _this.$refs.lineForm.init(item);
            });
            return;
          }
        });
      },
      //删除线
      delLine(conn) {
        this.$confirm("确定删除所点击的线吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.jsPlumb.deleteConnection(conn);
        }).catch(() => {
        });
      },
      // 是否具有该线
      hasLine(from, to) {
        for (var i = 0; i < this.data.lineList.length; i++) {
          var line = this.data.lineList[i];
          if (line.from === from && line.to === to) {
            return true;
          }
        }
        return false;
      },

      // 起点是否是用户节点
      origUser(from, to) {
        for (let i = 0; i < this.data.nodeList.length; i++) {
          let node = this.data.nodeList[i];
          if(node.id == from){
            if(node.Type == 3){
              return true;
            }
          }
        }
        return false;
      },
      // 是否含有相反的线
      hashOppositeLine(from, to) {
        return this.hasLine(to, from);
      },
      lineLabelSave(line) {
        this.currentConnect.getOverlay("label-1").setLabel(line.label);
        //this.$set(this.currentLine, 'label', line.label);
      },

      fullScreenLoading(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        return loading;
      },

      validateLine(line){
        let name = line.pipeName;
        if(!line.psType){
          this.$message.error("管道"+name+"敷设方式不能为空！");
          return false;
        }
        if(!line.pipeOutside||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.pipeOutside))){
          this.$message.error("管道"+name+"管道外径数据错误！");
          return false;
        }
        if(!line.pipeWidth||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.pipeWidth))){
          this.$message.error("管道"+name+"管道壁厚数据错误！");
          return false;
        }
        if(!line.pipeSize||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.pipeSize))){
          this.$message.error("管道"+name+"管道长度数据错误！");
          return false;
        }
        if(!line.localNum||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.localNum))){
          this.$message.error("管道"+name+"局部阻系数数据错误！");
          return false;
        }
        if(!line.airOutside||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.airOutside))){
          this.$message.error("管道"+name+"空气层外径数据错误！");
          return false;
        }
        if(!line.pressNum||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.pressNum))){
          this.$message.error("管道"+name+"压降系数数据错误！");
          return false;
        }
        if(!line.degreeNum||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.degreeNum))){
          this.$message.error("管道"+name+"温降系数数据错误！");
          return false;
        }
        if(!line.degreeLevel||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(line.degreeLevel))){
          this.$message.error("管道"+name+"保温层数数据错误！");
          return false;
        }
        let table = line.pipeLineMaterials;
        if(!table||table.length==0){
          this.$message.error("管道"+name+"保温层数数据为空！");
          return false;
        }
        for(let _data of table){
          if(!_data.materialType){
            this.$message.error("管道"+name+"材质不能为空！");
            return false;
          }
          if(!_data.reflect){
            this.$message.error("管道"+name+"反射层不能为空！");
            return false;
          }
          if(!_data.lineWidth||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(_data.lineWidth))){
            this.$message.error("管道"+name+"材料厚度数据错误！");
            return false;
          }
        }
        return true;
      },
      lineCompute(line) {
        if(!this.validateLine(line)){
          return;
        }
        let nodeArray = this.getPipeG(line);
        if(nodeArray.length ==0){
          this.$message.error("管道"+line.pipeName+"没有用户！");
          return;
        }
        let pipeG = {};
        for(let _u of nodeArray){
          let table = _u.table;
          if(!table){
            this.$message.error("管道"+line.pipeName+"24小时负载设置出错！");
            return;
          }
          for(let key in table){
            pipeG[key] = pipeG[key]?pipeG[key]:0;
            let v = parseFloat(table[key]?table[key]:0);
            pipeG[key] = pipeG[key] +v;
          }
        }
        line.pipeG = pipeG;
        let startTime = new Date();
        let loading = this.fullScreenLoading();
        let from_id =  line.from;
        let nodes = this.data.nodeList;
        for (let n of nodes) {
          if (from_id == n.id) {
            if(!n.temperature){
              this.$message.error("管道"+n.name+"T0温度不可知！");
            }
            line.initT0 = n.temperature;
            break;
          }
        }
        this.programInfo.pipeLine = line;
        let self = this;
        self.$http({
          url: "/pipe/program/queryComputeAir",
          method: "post",
          data: JSON.stringify(this.programInfo),
          dataType: 'json',
          contentType: "application/json",
        }).then(resp => {
          console.log(resp);
          console.log((startTime - new Date())/1000);
          loading.close();
        });
      },
      drag(item) {
        this.currentItem = item;
      },
      drop(event) {
        //event.preventDefault();
        var _obj = this.$refs.flowContent;
        let nodes = this.data.nodeList;
        let typeCount = 0;
        for (let n of nodes) {
          if (this.currentItem.type == n.Type) {
            typeCount = n.index > typeCount ? n.index : typeCount;
          }
        }
        var temp = {
          id: this.currentItem.alia + (typeCount + 1),
          label: this.currentItem.name,
          name: this.currentItem.name + this.currentItem.alia + (typeCount + 1),
          index: typeCount + 1,
          top: event.offsetY + "px",
          left: event.offsetX + "px",
          Type: this.currentItem.type,
        };
        this.addNode(temp);
        // this.editNode(temp.id);
      },
      allowDrop(event) {
        event.preventDefault();
      },
      getUUID() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
      },
      saveData() {//保存
        console.log(this.data);
        this.$message.success('保存成功!');
      },
      editFlow() {
        // this.drawer = true
        this.editType = "flow";
        // this.$nextTick(function () {
        //     this.$refs.flowEdit.init(this.data.flowInfo);
        // });
      },
      togglePanel() { //点击显示参数设置
        if (this.editType == 'flow') {
          this.drawer = false
        } else {
          this.drawer ? this.hide() : this.show()
        }
      },
      show() {
        this.drawer = true
        document.addEventListener('click', this.hidePanel, false)
      },
      hide() {
        this.drawer = false
        document.removeEventListener('click', this.hidePanel, false)
      },
      hidePanel(e) {
        if (this.$refs.main && !this.$refs.main.contains(e.target)) {//点击除弹出层外的空白区域
          this.hide()
        }
      },
      closeProject() {//关闭项目
        let self = this;
        this.$confirm("确定关闭项目吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          self.$router.push({path: "/ProjectList"});
        }).catch(() => {
        });
      },

      addDesign() { //新建设计弹框
        this.addDialog = true;
      },
      getFormData(data) {//获取设计数据
        let self = this;
        let user = JSON.parse(getToken());
        data.createUser = user.id;
        self.programInfo = data;
        self.$http({
          url: "/pipe/program/queryPipeProgramId",
          method: "post",
        }).then(resp => {
          if (!resp.success) {
            self.$message.error("查询建项目失败！");
          }else{
            let code = resp.result;
            let tip = data.programName + " " +code;
            self.$message.success("新建项目成功！");
            self.name = '中国大唐电力股份有限公司 '+tip;
            self.isEdit = true;
          }
          self.addDialog = false
        });
        // self.$http({
        //   url: "/pipe/program/addPipeProgram",
        //   method: "post",
        //   params: data
        // }).then(resp => {
        //   if (!resp.success) {
        //     self.$message.error("新建项目失败！");
        //   }else{
        //     let code = resp.result;
        //     let tip = data.programName + " " +code;
        //     self.$message.success("新建项目成功！");
        //     self.name = '中国大唐电力股份有限公司 '+tip;
        //     self.isDraggable = true
        //   }
        //   self.addDialog = false
        // });
      },
      computer() {//物性速算
        this.computerDialog = true
      },
      getLoad(data) { //24h负载设置弹框
        this.setDialog = true;
        this.loadSetData = Object.assign({},data);
      },
      getLoadData(_n) {
        this.isShowEchart = false;
        this.data.nodeList.filter((node) => {
          if (node.id === _n.id) {
            node.table = _n.table;
            node.isShowEchart = true;
          }
        });
        this.$nextTick(() => {
          this.isShowEchart = true;
        });
        this.setDialog = false; //24h负载设置弹框——关闭
        this.$message.success('提交成功!');
      },
      showLog(data) {//用户输出结果弹框
        this.logDialog = data
      },
      checkLog(data) {//查看输出结果弹框
        this.checkDialog = data
      },
      iterPipeG(id,array,nodeMap){
        for(let _link of this.data.lineList){
           if(_link.from == id){
             let to_id = _link.to;
             let node = nodeMap[to_id];
             if(node.Type =='3'){
               array.push(node);
             }
             this.iterPipeG(_link.to,array,nodeMap);
           }
        }
      },
      getPipeG(line){
        let from_id = line.from;
        let nodeMap = {};
        let nodeArray = [];
        for(let n of this.data.nodeList){
          nodeMap[n.id] = n;
        }
        this.iterPipeG(from_id,nodeArray,nodeMap);
        return nodeArray;
      },
      goPage(val) {
        if (val == '项目信息') {
          this.projectDialog = true;
          return;
        }
        let lineList = this.data.lineList;
        let nodeList = this.data.nodeList;
        if(nodeList.length == 0){
          this.$message.error('请添加节点!');
          return;
        }
        if(lineList.length == 0){
          this.$message.error('请添加管道!');
          return;
        }
        let linkSet = new Set();
        for(let l of lineList){
          linkSet.add(l.from);
          linkSet.add(l.to);
          // if(!l.pipeG){
          //   this.$message.error('请设置蒸汽流量!');
          //   return;
          // }
        }
        for(let n of nodeList){
          if(!linkSet.has(n.id)){
            this.$message.error(n.name+"没有管道");
            return;
          }
        }
        if (val == '设计检查' || val =='网关计算') {
          for(let n of nodeList){
            let name = n.name;
            if(n.Type =='1' || n.Type =='3'){
              let temperature = n.temperature;
              let pressure = n.pressure;
              if(!temperature||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(temperature))){
                this.$message.error("节点"+name+"温度数据错误！");
                return;
              }
              if(!pressure||(!(/^[+-]?(0|([1-9]\d*))(\.\d+)?$/).test(pressure))){
                this.$message.error("节点"+name+"压力数据错误！");
                return;
              }
            }
            if(n.Type =='3'){

            }
          }
        }
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '@/assets/style/design.scss';

  .appcontainer {
    display: flex;
    height: calc(100vh - 50px);
    color: #606266;
  }

  .flow-detail {
    flex: 1;
    border: 1px solid #ebeef5;
    padding: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    word-break: break-all;
    border-radius: 4px;
    position: relative;

    // background: -webkit-linear-gradient(top,transparent 39px,#dedede 40px),-webkit-linear-gradient(left,transparent 39px,#dedede 40px);
    // background-size: 40px 40px;
  }

  #flowContent {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .item {
    position: absolute;
    width: 60px;
    height: 90px;
    border: 1px solid #007aff;
  }

  .flow-menu {
    width: 100px;
    background: #284358;
    padding: 10px;
    word-break: break-all;
    height: 100%;
    overflow-y: scroll;
  }

  *::-webkit-scrollbar {
    width: 0px !important;
    height: 0px !important;
    -webkit-appearance: none;
  }

  *::-webkit-scrollbar-thumb {
    height: 4px;
    border: 1px solid transparent;
    border-top: 0;
    border-bottom: 0;
    border-radius: 4px;
    background-color: #ccc;
    background-clip: padding-box;
  }

  .menu-item {
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
    color: #ffffff;
    padding: 5px 0;

    .imgsrc {
      width: 45px;
      height: 45px;
      margin-bottom: 3px;
    }
  }

  .menu-item > i {
    font-size: 30px;
  }

  .flow-edit {
    width: 100%
  }

  .flow-edit-content {
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    word-break: break-all;
  }

  .csslabel {
    color: #434343;
    font-weight: 400;
    z-index: 10;
    font-size: 12px;
    color: #1397de;
    background: #fff;
  }

  .csslabel .label-text {
    background-color: white;
  }

  .savebtn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
</style>
